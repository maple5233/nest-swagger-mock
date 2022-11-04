import { FAKE_STRING_METADATA_KEY } from '@/decorators/constants'

export type FakeStringOptions =
  | {
      /**
       * if specified, will use faker.dataType.string() to generate string
       */
      type: 'random'
      minLength?: number
      maxLength?: number
    }
  | {
      /**
       * if specified, will use faker.random.words() to generate string
       */
      type: 'words'
      minWordsCount?: number
      maxWordsCount?: number
    }
  | {
      /**
       * if specified, will use faker.helper.fake() to generate string
       */
      type: 'template'
      template: string
    }
  | {
      /**
       * if specified, will use faker.dataType.uuid() to generate string
       */
      type: 'uuid'
    }
  | {
      type: 'default'
    }

export const FakeString = (options: FakeStringOptions) =>
  Reflect.metadata(FAKE_STRING_METADATA_KEY, options)
export const getFakeStringOptions = (target: any, propertyKey: string) =>
  Reflect.getMetadata(FAKE_STRING_METADATA_KEY, target, propertyKey) as
    | FakeStringOptions
    | undefined
