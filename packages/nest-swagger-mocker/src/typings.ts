import type { OpenAPIObject } from '@nestjs/swagger'
import type { ExecutionContext, LoggerService } from '@nestjs/common'
import type { Faker } from '@faker-js/faker'

export type ClassType = { new (...args: any[]): any; prototype: Object }
export type ResponseTypeMarkRecord = Record<number | string, { type: ClassType }>

export interface IMockInterceptorOptions {
  document: OpenAPIObject
  shouldMockChecker?: (context: ExecutionContext) => boolean
  logger?: LoggerService
  fakerOptions?: IFakeOptions
}

export type ICreateMockInterceptorOptions = IMockInterceptorOptions

export interface IFakeOptions {
  setup?: (faker: Faker) => void
  /**
   * default probability for faker.maybe
   * will be use for when the property is not required has value
   * @default 0.9
   */
  defaultProbability?: number
}

export type IFullFakeOptions = Required<IFakeOptions>
