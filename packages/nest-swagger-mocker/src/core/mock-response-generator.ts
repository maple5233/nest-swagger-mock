import { faker } from '@faker-js/faker'
import type { OpenAPIObject } from '@nestjs/swagger'
import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'
import type { LoggerService } from '@nestjs/common'

import type { ClassType } from '@/typings'
import type { FakeNumberOptions } from '@/decorators/fake-number'
import { getFakeNumberOptions } from '@/decorators/fake-number'
import type { FakeStringOptions } from '@/decorators/fake-string'
import { getFakeStringOptions } from '@/decorators/fake-string'
import { dereferenceSchema } from '@/utils/dereference-schema'
import type { IFakeBooleanOptions } from '@/decorators'
import { getArrayCount, getFakeBooleanOptions, getFakeArrayItemClassType } from '@/decorators'

export class MockResponseGenerator {
  constructor(
    private readonly document: OpenAPIObject,
    private readonly schema: SchemaObject,
    private readonly classType: ClassType,
    private readonly logger: LoggerService,
  ) {}

  getDefaultOrExampleValue(schema = this.schema) {
    if (typeof schema.example !== 'undefined') {
      return schema.example as unknown
    }
    if (typeof schema.examples !== 'undefined') {
      return faker.helpers.arrayElement(Object.values(schema.examples)) as unknown
    }
    if (typeof schema.enum !== 'undefined') {
      return faker.helpers.arrayElement(schema.enum) as unknown
    }
    if (typeof schema.default !== 'undefined') {
      return schema.default as unknown
    }
  }

  generate(currentClassType = this.classType): unknown {
    const defaultOrExampleValue = this.getDefaultOrExampleValue()
    if (defaultOrExampleValue) {
      return defaultOrExampleValue
    }

    const responseBuilder: Record<string, unknown> = {}
    const properties = this.schema.properties ?? {}

    for (const [key, value] of Object.entries(properties)) {
      if ('$ref' in value) {
        const subSchema = dereferenceSchema(this.document, value)
        if (!subSchema) {
          this.logger.warn(`Cannot find schema for ${value.$ref}`)
          continue
        }
        const subClassType = Reflect.getMetadata(
          'design:type',
          currentClassType.prototype,
          key,
        ) as ClassType
        responseBuilder[key] = new MockResponseGenerator(
          this.document,
          subSchema,
          subClassType,
          this.logger,
        ).generate(subClassType)
        continue
      }

      if ('allOf' in value) {
        const subSchemas =
          value?.allOf?.map((subSchema) => dereferenceSchema(this.document, subSchema)) ?? []
        const responses = subSchemas.map((subSchema) => {
          if (!subSchema) {
            return null
          }
          const subClassType = Reflect.getMetadata(
            'design:type',
            currentClassType.prototype,
            key,
          ) as ClassType
          return new MockResponseGenerator(
            this.document,
            subSchema,
            subClassType,
            this.logger,
          ).generate(subClassType)
        })
        responseBuilder[key] = Object.assign({}, ...responses)

        continue
      }

      const defaultOrExampleValue = this.getDefaultOrExampleValue(value)

      if (defaultOrExampleValue) {
        responseBuilder[key] = defaultOrExampleValue
        continue
      }

      switch (value?.type) {
        case 'string': {
          const maybeFakeStringOptions = getFakeStringOptions(currentClassType.prototype, key)
          responseBuilder[key] = this.generateString(maybeFakeStringOptions)
          break
        }

        case 'number': {
          const maybeFakeNumberOptions = getFakeNumberOptions(currentClassType.prototype, key)
          responseBuilder[key] = this.generateNumber(maybeFakeNumberOptions)
          break
        }

        case 'boolean': {
          const maybeFakeBooleanOptions = getFakeBooleanOptions(currentClassType.prototype, key)
          responseBuilder[key] = MockResponseGenerator.generateBoolean(maybeFakeBooleanOptions)
          break
        }

        case 'array': {
          if (!value?.items) {
            break
          }
          const count = getArrayCount(currentClassType.prototype, key) ?? 3

          if ('$ref' in value.items) {
            const arrayItemSchema = dereferenceSchema(this.document, value.items)
            if (!arrayItemSchema) {
              break
            }
            const arrayItemClassType = Reflect.getMetadata(
              'design:type',
              currentClassType.prototype,
              key,
            ) as ClassType
            const arrayItemClassTypeFromDecorator = getFakeArrayItemClassType(
              currentClassType.prototype,
              key,
            )
            responseBuilder[key] = Array.from({ length: count }, () =>
              new MockResponseGenerator(
                this.document,
                arrayItemSchema,
                arrayItemClassTypeFromDecorator ?? arrayItemClassType,
                this.logger,
              ).generate(),
            )
            break
          } else {
            // primitive type
            const arrayItemSchema = value.items
            responseBuilder[key] = Array.from({ length: count })
              .map(() =>
                new MockResponseGenerator(
                  this.document,
                  {
                    type: 'object',
                    properties: {
                      [key]: arrayItemSchema,
                    },
                  },
                  currentClassType,
                  this.logger,
                ).generate(),
              )
              .map((item) => (item as Record<string, unknown>)[key])
          }

          break
        }

        case 'object': {
          if (!value?.properties) {
            responseBuilder[key] = {}
            break
          }
          responseBuilder[key] = new MockResponseGenerator(
            this.document,
            value,
            currentClassType,
            this.logger,
          ).generate()
        }

        default: {
          break
        }
      }
    }

    return responseBuilder
  }

  generateString(options: FakeStringOptions = { type: 'default' }) {
    switch (options.type) {
      case 'random': {
        const { minLength = 1, maxLength = 10 } = options
        const biggerLength = Math.max(minLength, maxLength)
        const smallerLength = Math.min(minLength, maxLength)
        const length = faker.datatype.number({
          min: smallerLength,
          max: biggerLength,
        })
        return faker.datatype.string(length)
      }
      case 'template': {
        return faker.helpers.fake(options.template)
      }
      case 'words': {
        const { minWordsCount = 1, maxWordsCount = 10 } = options
        const biggerCount = Math.max(minWordsCount, maxWordsCount)
        const smallerCount = Math.min(minWordsCount, maxWordsCount)
        const wordsCount = faker.datatype.number({
          min: smallerCount,
          max: biggerCount,
        })
        return faker.random.words(wordsCount)
      }
      case 'uuid': {
        return faker.datatype.uuid()
      }
      case 'default': {
        return faker.random.words()
      }
      default: {
        const neverOptions: never = options
        this.logger.warn(`Unknown fake string options: ${JSON.stringify(neverOptions)}`)
        return faker.random.words()
      }
    }
  }

  generateNumber(options?: FakeNumberOptions) {
    const min = Math.min(options?.min ?? 0, options?.max ?? 0)
    const max = Math.max(options?.min ?? 0, options?.max ?? 0)
    const fixedOptions = {
      ...options,
      min,
      max,
    }
    if (options?.isFloat) {
      if (fixedOptions?.precision && fixedOptions.precision > 1) {
        this.logger.warn(`Precision should be less than 1, but got ${fixedOptions.precision}`)
      }
      return faker.datatype.float(fixedOptions)
    }
    if (options) {
      return faker.datatype.number(fixedOptions)
    }
    return faker.datatype.number()
  }

  static generateBoolean(options?: IFakeBooleanOptions) {
    if (!options) {
      return faker.datatype.boolean()
    }
    if (options?.probability) {
      return Math.random() < options.probability
    }
  }
}
