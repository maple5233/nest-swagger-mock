import { FAKE_BOOLEAN_METADATA_KEY } from '@/decorators/constants'

export interface IFakeBooleanOptions {
  probability: number
}

export const FakeBoolean = (options: IFakeBooleanOptions) =>
  Reflect.metadata(FAKE_BOOLEAN_METADATA_KEY, options)
export const getFakeBooleanOptions = (target: any, propertyKey: string) =>
  Reflect.getMetadata(FAKE_BOOLEAN_METADATA_KEY, target, propertyKey) as
    | IFakeBooleanOptions
    | undefined
