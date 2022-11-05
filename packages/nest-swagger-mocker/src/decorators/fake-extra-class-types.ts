import { FAKE_EXTRA_CLASS_TYPES_METADATA_KEY } from '@/decorators/constants'
import type { ClassType } from '@/typings'

export const FakeExtraClassTypes = (types: ClassType[]) =>
  Reflect.metadata(FAKE_EXTRA_CLASS_TYPES_METADATA_KEY, types)

export const getFakeExtraClassTypes = (target: any): ClassType[] | undefined =>
  Reflect.getMetadata(FAKE_EXTRA_CLASS_TYPES_METADATA_KEY, target)
