import { FAKE_ARRAY_COUNT_METADATA_KEY } from '@/decorators/constants'

export const ArrayCount = (count: number): PropertyDecorator =>
  Reflect.metadata(FAKE_ARRAY_COUNT_METADATA_KEY, count)
export const getArrayCount = (target: any, propertyKey: string) =>
  Reflect.getMetadata(FAKE_ARRAY_COUNT_METADATA_KEY, target, propertyKey) as number
