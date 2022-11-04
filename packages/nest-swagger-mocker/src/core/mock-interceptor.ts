import { constants as HTTPConstants } from 'http2'
import { of } from 'rxjs'
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { faker } from '@faker-js/faker'
import type { Request } from 'express'

import { MockResponseGenerator } from '@/core/mock-response-generator'
import { findSchemaByClassName } from '@/utils/find-schema-by-class-name'
import { IMockInterceptorOptions } from '@/typings'
import type { IFullFakeOptions, ResponseTypeMarkRecord } from '@/typings'

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

  private static getResponseType(method: Function) {
    const responseTypeMarkRecord = Reflect.getMetadata(
      'swagger/apiResponse',
      method,
    ) as ResponseTypeMarkRecord

    if (!responseTypeMarkRecord) {
      return
    }

    const responseTypeMark =
      responseTypeMarkRecord[HTTPConstants.HTTP_STATUS_OK] ?? responseTypeMarkRecord.default
    return responseTypeMark.type
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    const method = context.getHandler()

    const responseType = MockInterceptor.getResponseType(method)
    if (!responseType) {
      this.logger.debug?.('No response type found')
      return next.handle()
    }

    const responseClassName = responseType.name
    const responseSchema = findSchemaByClassName(this.options.document, responseClassName)
    if (!responseSchema) {
      this.logger.debug?.('No response schema found')
      return next.handle()
    }
    // this.logger.debug?.('Response schema found:', responseSchema)

    const mockValue = new MockResponseGenerator(
      this.options.document,
      responseSchema,
      responseType,
      this.logger,
      this.fakerOptions,
    ).generate()

    // ;(mockValue as Record<string, unknown>).$schema = responseSchema
    ;(mockValue as Record<string, unknown>).$document = this.options.document

    if (this.shouldMockChecker(context)) {
      return of(mockValue)
    }

    return next.handle()
  }
}
