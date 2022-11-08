import { constants as HTTPConstants } from 'http2'
import { of } from 'rxjs'
import { Injectable } from '@nestjs/common'
import { faker } from '@faker-js/faker'
import type { Request } from 'express'
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'

import { MockResponseGenerator } from '@/core/mock-response-generator'
import {
  SWAGGER_API_EXTRA_MODELS_METADATA_KEY,
  SWAGGER_API_RESPONSE_METADATA_KEY,
} from '@/decorators/constants'
import { findSchemaByClassName } from '@/utils/find-schema-by-class-name'
import { dereferenceSchema } from '@/utils/dereference-schema'
import { IMockInterceptorOptions } from '@/typings'
import type { IFullFakeOptions, ResponseTypeMarkRecord } from '@/typings'
import { setPropertyMetaDataToClass } from '@/utils/reflect'

@Injectable()
export class MockInterceptor implements NestInterceptor {
  private readonly logger
  private readonly shouldMockChecker
  private readonly fakerOptions: IFullFakeOptions
  private readonly defaultOptions = {
    shouldMockChecker: (context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest<Request>()
      return request.headers['x-mock'] === 'true'
    },
    logger: console,
    fakerOptions: {
      defaultProbability: 0.9,
      setup: () => null,
    },
  }

  constructor(private readonly options: IMockInterceptorOptions) {
    // init
    this.logger = this.options.logger ?? this.defaultOptions.logger
    this.shouldMockChecker = this.options.shouldMockChecker ?? this.defaultOptions.shouldMockChecker
    this.fakerOptions = {
      ...this.options.fakerOptions,
      setup: this.options.fakerOptions?.setup ?? this.defaultOptions.fakerOptions.setup,
      defaultProbability:
        this.options.fakerOptions?.defaultProbability ??
        this.defaultOptions.fakerOptions.defaultProbability,
    }

    // execute setup
    this.fakerOptions.setup(faker)
  }

  private getResponseTypeAndSchema(method: Function, actionName: string) {
    const responseTypeMarkRecord = Reflect.getMetadata(
      SWAGGER_API_RESPONSE_METADATA_KEY,
      method,
    ) as ResponseTypeMarkRecord

    if (!responseTypeMarkRecord) {
      return
    }

    const responseTypeMark =
      responseTypeMarkRecord[HTTPConstants.HTTP_STATUS_OK] ?? responseTypeMarkRecord.default
    const extraTypes = MockResponseGenerator.getExtraClassTypes(method)

    const fakeClass = class FakeClassForSchema {}
    const innerFakeClass = class FakeClassForSchemaDataProperty {}
    Reflect.defineMetadata(SWAGGER_API_EXTRA_MODELS_METADATA_KEY, extraTypes, fakeClass)
    setPropertyMetaDataToClass(fakeClass, 'data', innerFakeClass)

    const type = responseTypeMark?.type
    const schema = dereferenceSchema(this.options.document, responseTypeMark?.schema)

    if (!type && !schema) {
      this.logger.warn?.('Both response type and schema not found, skip mocking', actionName)
      return undefined
    }

    if (type && schema) {
      this.logger.warn?.(
        'Both response type and schema found, use schema to mock response',
        actionName,
      )
      return {
        use: 'schema',
        schema: {
          type: 'object',
          /**
           * If user use `@ApiResponse({ schema: {...} })` to define response type,
           * in order to reuse the logic when using type
           * we need to wrap the schema with a fake class with `data` property
           */
          properties: {
            data: schema,
          },
        },
        type: fakeClass,
      }
    }

    if (type) {
      const schemaByClassName = findSchemaByClassName(this.options.document, type.name)
      if (!schemaByClassName) {
        this.logger.warn?.('Type found but it is invalid, skip mocking', actionName)
        return undefined
      }

      return {
        use: 'type',
        type,
        schema: schemaByClassName,
      }
    }

    if (schema) {
      return {
        use: 'schema',
        schema: {
          type: 'object',
          properties: {
            data: schema,
          },
        },
        type: fakeClass,
      }
    }

    return undefined
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    const method = context.getHandler()
    const actionName = `${context.getClass().name}.${method.name}`

    if (this.shouldMockChecker(context)) {
      const responseTypeAndSchema = this.getResponseTypeAndSchema(method, actionName)

      if (!responseTypeAndSchema) {
        return next.handle()
      }

      try {
        const mockResult = new MockResponseGenerator(
          this.options.document,
          responseTypeAndSchema.schema,
          responseTypeAndSchema.type,
          this.logger,
          this.fakerOptions,
        ).generate()
        const mockValue =
          responseTypeAndSchema.use === 'type'
            ? mockResult
            : (mockResult.data as Record<string, unknown>)

        // mockValue.$document = this.options.document
        return of(mockValue)
      } catch (error) {
        this.logger.error?.('Error occurred while mocking response', `${actionName}`, error)
        return next.handle()
      }
    }

    return next.handle()
  }
}
