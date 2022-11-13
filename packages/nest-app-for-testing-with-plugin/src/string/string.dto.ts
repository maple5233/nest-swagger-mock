import { FakeString } from 'nest-swagger-mocker'

export class NormalString {
  message: string
}

export class UUIDString {
  @FakeString({
    type: 'uuid',
  })
  message: string
}

export class WordsString {
  @FakeString({
    type: 'words',
    minWordsCount: 5,
    maxWordsCount: 10,
  })
  message: string
}

export class RandomString {
  @FakeString({
    type: 'random',
    minLength: 9,
    maxLength: 10,
  })
  message: string
}

export class TemplateString {
  @FakeString({
    type: 'template',
    template: 'Hello {{name.lastName}}, {{name.firstName}} {{name.suffix}}',
  })
  message: string
}

export class DefaultString {
  @FakeString({
    type: 'default',
  })
  message: string
}
