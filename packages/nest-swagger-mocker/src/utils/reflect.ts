import type { ClassType } from '@/typings'

export const getPropertyMetaDataFromClass = <TResult = unknown>(
  classType: ClassType,
  propertyKey: string,
) => Reflect.getMetadata('design:type', classType.prototype, propertyKey) as TResult
