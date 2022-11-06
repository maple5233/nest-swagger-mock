import { faker } from '@faker-js/faker'
import type { OpenAPIObject } from '@nestjs/swagger'
import type { LoggerService } from '@nestjs/common'
import type {
  SchemaObject,
  ReferenceObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'

import { dereferenceSchema } from '@/utils/dereference-schema'
import {
  getArrayCount,
  getFakeBooleanOptions,
  getFakeArrayItemClassType,
  getFakeStringOptions,
  getFakeNumberOptions,
  getFakeExtraClassTypes,
} from '@/decorators'
import type { IFakeBooleanOptions, FakeStringOptions, FakeNumberOptions } from '@/decorators'
import type { ClassType, IFullFakeOptions } from '@/typings'
import { getPropertyMetaDataFromClass } from '@/utils/reflect'
import { omit } from 'lodash'

export class MockResponseGenerator {
  constructor(
    private readonly document: OpenAPIObject,
    private readonly schema: SchemaObject,
    private readonly classType: ClassType,
    private readonly logger: LoggerService,
    private readonly globalFakeOptions: IFullFakeOptions,
  ) {}

  /**
   * make sure the min is less than max
   * @param min
   * @param max
   */
  private static fixMaxAndMinValue({ min, max }: { min?: number; max?: number }) {
    if (min !== undefined && max !== undefined && min > max) {
      return { min: max, max: min }
    }
    return { min, max }
  }

  /**
   * when the schema has example / default / enum value, use it
   * @param schema
   * @private
   */
  private generateValueFromDefaultOrExampleOrEnum(schema = this.schema) {
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

  /**
   * generate string value
   * support type:
   * 1. random: random length string
   * 2. template: template string
   * 3. word: random words
   * 4. uuid: uuid
   * 5. default: 1-3 random words
   * @param options
   */
  private generateString(options: FakeStringOptions = { type: 'default' }) {
    switch (options.type) {
      case 'random': {
        const { minLength, maxLength = 5 } = options
        const { min, max } = MockResponseGenerator.fixMaxAndMinValue({
          min: minLength,
          max: maxLength,
        })
        const length = faker.datatype.number({
          min,
          max,
        })
        return faker.datatype.string(length)
      }
      case 'template': {
        return faker.helpers.fake(options.template)
      }
      case 'words': {
        const { minWordsCount, maxWordsCount = 5 } = options
        const { min, max } = MockResponseGenerator.fixMaxAndMinValue({
          min: minWordsCount,
          max: maxWordsCount,
        })
        const wordsCount = faker.datatype.number({
          min,
          max,
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

  /**
   * generate number value
   * @param options
   */
  private generateNumber(options?: FakeNumberOptions) {
    if (!options) {
      return faker.datatype.number()
    }

    const fixedOptions = {
      ...options,
      ...MockResponseGenerator.fixMaxAndMinValue({
        min: options.min,
        max: options.max,
      }),
    }

    if (fixedOptions.isFloat) {
      if (fixedOptions.precision && fixedOptions.precision > 1) {
        this.logger.warn(`Precision should be less than 1, but got ${fixedOptions.precision}`)
      }
      return faker.datatype.float(fixedOptions)
    }

    return faker.datatype.number(omit(fixedOptions, 'isFloat', 'precision'))
  }

  private static generateBoolean(options?: IFakeBooleanOptions) {
    if (!options) {
      return faker.datatype.boolean()
    }

    if (options.probability) {
      return Math.random() < options.probability
    }
  }

  /**
   * check if the key is optional
   * @param schema
   * @param key
   * @private
   */
  private static isOptionalKey(schema: SchemaObject, key: string) {
    return Array.isArray(schema.required) && schema.required?.includes(key) === false
  }

  /**
   * if a key is optional, it may not be in the response,
   * and the default probability of existing is 0.9
   * @param schema
   * @param key
   * @private
   */
  private shouldSkipDueToItIsAnOptionalKey(schema: SchemaObject, key: string) {
    return (
      MockResponseGenerator.isOptionalKey(schema, key) &&
      !MockResponseGenerator.generateBoolean({
        probability: this.globalFakeOptions.defaultProbability,
      })
    )
  }

  /**
   * for allOf / oneOf / anyOf, we still want to use the metadata for deciding the fake rule
   * so we need to get all the class type of the allOf items
   * The First way, we can get the class type list from the metadata (key 'swagger/apiExtraModels') when user use @ApiExtraModels
   * The second way, we can get the class type list from the metadata (key FAKE_EXTRA_CLASS_TYPES_METADATA_KEY) when user use @FakeExtraClassTypes
   *
   * @param classType the class which has @ApiExtraModels or @FakeExtraClassTypes
   */
  private static getExtraClassTypes(classType: ClassType) {
    return [
      ...(getFakeExtraClassTypes(classType) ?? []),
      ...((Reflect.getMetadata('swagger/apiExtraModels', classType) as ClassType[]) ?? []),
    ]
  }

  /**
   * find the match ClassType of subSchema from the metadata of fatherClassType
   * @param fatherClassType
   * @param subSchema
   * @private
   */
  private static getExtraClassType(
    fatherClassType: ClassType,
    subSchema: SchemaObject | ReferenceObject,
  ) {
    const extraClassTypes = MockResponseGenerator.getExtraClassTypes(fatherClassType)
    if ('$ref' in subSchema) {
      return extraClassTypes.find((classType) => classType.name === subSchema.$ref.split('/').pop())
    }
    return
  }

  /**
   * generate a fake class with a property which has specified design:type metadata
   * @param propertyKey
   * @param propertyClassType
   * @private
   */
  private static generateFakeClassType(propertyKey: string, propertyClassType?: ClassType) {
    const fakeClassType = class {}
    Reflect.defineMetadata('design:type', propertyClassType, fakeClassType.prototype, propertyKey)
    return fakeClassType
  }

  /**
   * For allOf, we will merge all the sub schema of the allOf together
   * @param schema
   * @param classType
   * @param propertyKey
   * @private
   */
  private generateValueFromAllOf(schema: SchemaObject, classType: ClassType, propertyKey: string) {
    if (!schema.allOf) {
      return
    }

    const responses = schema.allOf.map((subSchema) => {
      const extraClassType = MockResponseGenerator.getExtraClassType(classType, subSchema)
      const fakeClassType = MockResponseGenerator.generateFakeClassType(propertyKey, extraClassType)
      const subClassType = extraClassType ? fakeClassType : classType
      return this.generateValueFromReferenceObject(subSchema, subClassType, propertyKey)
    })

    return Object.assign({}, ...responses) as Record<string, unknown>
  }

  /**
   * dereference the schema and generate the value
   * @param schema
   * @param classType the ClassType match the schema
   * @param propertyKey
   * @private
   */
  private generateValueFromReferenceObject(
    schema: ReferenceObject | SchemaObject,
    classType: ClassType,
    propertyKey: string,
  ) {
    const refSchema = dereferenceSchema(this.document, schema)
    if (!refSchema) {
      if ('$ref' in schema) {
        this.logger.warn(`Cannot find schema for ${schema.$ref}`)
      }
      return
    }

    const subClassType = getPropertyMetaDataFromClass<ClassType>(classType, propertyKey)

    return new MockResponseGenerator(
      this.document,
      refSchema,
      subClassType,
      this.logger,
      this.globalFakeOptions,
    ).generate()
  }

  /**
   * For array,
   * 1. get the count of the array
   * 2. if the array item is a reference object, we will dereference it and generate the value
   * 3. if the array item is a primitive type, we will generate the value from the father class type,
   * then we can use decorators to define the fake options
   * @param schema
   * @param classType
   * @param propertyKey
   * @private
   */
  private generateValueFromArray(schema: SchemaObject, classType: ClassType, propertyKey: string) {
    if (!schema.items) {
      return []
    }

    const count = getArrayCount(classType.prototype, propertyKey) ?? 3

    if ('$ref' in schema.items) {
      // Object(type: ClassType) array
      const arrayItemSchema = dereferenceSchema(this.document, schema.items)
      if (!arrayItemSchema) {
        return
      }

      /**
       * will be [Function: Array] in fact
       * @see https://codesandbox.io/s/wispy-forest-ij56bq?file=/src/index.ts
       * typescript will not decorate the type of the array item
       */
      const arrayItemClassType = getPropertyMetaDataFromClass<ClassType>(classType, propertyKey)!
      /**
       * if the @FakeArrayItemClassType is used, we will use the metadata
       */
      const arrayItemClassTypeFromDecorator = getFakeArrayItemClassType(
        classType.prototype,
        propertyKey,
      )

      return Array.from({ length: count }, () =>
        new MockResponseGenerator(
          this.document,
          arrayItemSchema,
          arrayItemClassTypeFromDecorator ?? arrayItemClassType,
          this.logger,
          this.globalFakeOptions,
        ).generate(),
      )
    }

    // primitive type, use an object as payload and the father ClassType to pass-through the metadata of class property
    const arrayItemSchema = schema.items
    return Array.from({ length: count })
      .map(() =>
        new MockResponseGenerator(
          this.document,
          {
            type: 'object',
            properties: {
              [propertyKey]: arrayItemSchema,
            },
          },
          classType,
          this.logger,
          this.globalFakeOptions,
        ).generate(),
      )
      .map((item) => item[propertyKey])
  }

  generate(currentClassType = this.classType): Record<string, unknown> {
    const defaultOrExampleValue = this.generateValueFromDefaultOrExampleOrEnum()
    if (defaultOrExampleValue) {
      return { ...defaultOrExampleValue }
    }

    const responseBuilder: Record<string, unknown> = {}
    const properties = this.schema.properties ?? {}

    for (const [key, value] of Object.entries(properties)) {
      if (this.shouldSkipDueToItIsAnOptionalKey(this.schema, key)) {
        continue
      }

      if ('$ref' in value) {
        responseBuilder[key] = this.generateValueFromReferenceObject(value, currentClassType, key)
        continue
      }

      if ('allOf' in value) {
        responseBuilder[key] = this.generateValueFromAllOf(value, currentClassType, key)
        continue
      }

      const defaultOrExampleValue = this.generateValueFromDefaultOrExampleOrEnum(value)
      if (defaultOrExampleValue) {
        responseBuilder[key] = defaultOrExampleValue
        continue
      }

      switch (value.type) {
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
          responseBuilder[key] = this.generateValueFromArray(value, currentClassType, key)
          break
        }

        case 'object': {
          responseBuilder[key] = new MockResponseGenerator(
            this.document,
            value,
            currentClassType,
            this.logger,
            this.globalFakeOptions,
          ).generate()
          break
        }

        default: {
          break
        }
      }
    }

    return responseBuilder
  }
}
