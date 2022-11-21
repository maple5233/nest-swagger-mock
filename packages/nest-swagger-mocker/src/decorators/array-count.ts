import { FAKE_ARRAY_COUNT_METADATA_KEY } from '@/decorators/constants'

export const ArrayCount = (minCount: number, maxCount = minCount): PropertyDecorator =>
  Reflect.metadata(FAKE_ARRAY_COUNT_METADATA_KEY, [minCount, maxCount])
export const getArrayCount = (target: any, propertyKey: string) =>
  Reflect.getMetadata(FAKE_ARRAY_COUNT_METADATA_KEY, target, propertyKey) as [number, number]
