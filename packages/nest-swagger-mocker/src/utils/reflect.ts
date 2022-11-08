import { DESIGN_TYPE_METADATA_KEY } from '@/decorators/constants'
import type { ClassType } from '@/typings'

export const getPropertyMetaDataFromClass = <TResult = unknown>(
  classType: ClassType,
  propertyKey: string,
) => Reflect.getMetadata(DESIGN_TYPE_METADATA_KEY, classType.prototype, propertyKey) as TResult

export const setPropertyMetaDataToClass = (
  classType: ClassType,
  propertyKey: string,
  value: unknown,
) => Reflect.defineMetadata(DESIGN_TYPE_METADATA_KEY, value, classType.prototype, propertyKey)
