import { FAKE_OPTIONAL_METADATA_KEY } from '@/decorators/constants'

export const FakeOptional = (probability = 0.9): PropertyDecorator =>
  Reflect.metadata(FAKE_OPTIONAL_METADATA_KEY, probability)

export const getFakeOptional = (target: any, propertyKey: string | symbol): number | undefined => {
  if (!target) {
    return undefined
  }
  return Reflect.getMetadata(FAKE_OPTIONAL_METADATA_KEY, target, propertyKey)
}
