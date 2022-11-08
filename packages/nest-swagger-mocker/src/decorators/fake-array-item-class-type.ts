import { FAKE_ARRAY_ITEM_CLASS_TYPE_METADATA_KEY } from '@/decorators/constants'
import type { ClassType } from '@/typings'

/**
 * set the type(non-primitive-type) of the item of the array
 * you will need this when you want to generate a mock response for an object array
 * why? Current typeScript(4.8) will not decorate the type of the array item
 * @see https://stackoverflow.com/questions/35022658/how-do-i-get-array-item-type-in-typescript-using-the-reflection-api
 *
 * @param type a class type
 */
export const FakeArrayItemClassType = (type: ClassType): PropertyDecorator =>
  Reflect.metadata(FAKE_ARRAY_ITEM_CLASS_TYPE_METADATA_KEY, type)

export const getFakeArrayItemClassType = (
  target: any,
  propertyKey: string,
): ClassType | undefined =>
  Reflect.getMetadata(FAKE_ARRAY_ITEM_CLASS_TYPE_METADATA_KEY, target, propertyKey)
