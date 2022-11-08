import { FAKE_NUMBER_METADATA_KEY } from '@/decorators/constants'
import type { faker } from '@faker-js/faker'

type FakerDataTypeNumberOptions = Exclude<Parameters<typeof faker.datatype.number>[0], number>
export type FakeNumberOptions = FakerDataTypeNumberOptions & {
  isFloat?: boolean
}

export const FakeNumber = (options: FakeNumberOptions): PropertyDecorator =>
  Reflect.metadata(FAKE_NUMBER_METADATA_KEY, options)

export const getFakeNumberOptions = (target: any, propertyKey: string) =>
  Reflect.getMetadata(FAKE_NUMBER_METADATA_KEY, target, propertyKey) as
    | FakeNumberOptions
    | undefined
