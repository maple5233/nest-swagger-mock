import { FAKE_PROPERTY_METADATA_KEY } from '@/decorators/constants'

/**
 * @description Nest Swagger Mocker works base on metadata, but if a property is not decorated with any decorator,
 * typescript will not emit metadata for it, so we need to use this decorator to mark a property when we want to mock it
 *
 * Otherwise, the property will be ignored and mocked to {}
 */
export const FakeProperty = (): PropertyDecorator =>
  Reflect.metadata(FAKE_PROPERTY_METADATA_KEY, true)
