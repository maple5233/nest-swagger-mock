import { FAKE_RESPONSE_CUSTOM_MOCKING_METADATA_KEY } from '@/decorators/constants'
import type { Faker } from '@faker-js/faker'

export const CustomMocking = <TResponse = Record<string, unknown>>(
  mockingFunction: (response: Faker) => TResponse,
): ClassDecorator => Reflect.metadata(FAKE_RESPONSE_CUSTOM_MOCKING_METADATA_KEY, mockingFunction)

export const getCustomMocking = (
  target: any,
): ((response: Faker) => Record<string, unknown>) | undefined =>
  Reflect.getMetadata(FAKE_RESPONSE_CUSTOM_MOCKING_METADATA_KEY, target)
