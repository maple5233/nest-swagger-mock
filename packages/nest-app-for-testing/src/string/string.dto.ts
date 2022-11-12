import { ApiProperty } from '@nestjs/swagger'
import { FakeString } from 'nest-swagger-mocker'

export class NormalString {
  @ApiProperty({
    type: 'string',
  })
  message: string
}

export class UUIDString {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  @FakeString({
    type: 'uuid',
  })
  message: string
}

export class WordsString {
  @ApiProperty({
    type: 'string',
  })
  @FakeString({
    type: 'words',
    minWordsCount: 5,
    maxWordsCount: 10,
  })
  message: string
}

export class RandomString {
  @ApiProperty({
    type: 'string',
  })
  @FakeString({
    type: 'random',
    minLength: 9,
    maxLength: 10,
  })
  message: string
}

export class TemplateString {
  @ApiProperty({
    type: 'string',
  })
  @FakeString({
    type: 'template',
    template: 'Hello {{name.lastName}}, {{name.firstName}} {{name.suffix}}',
  })
  message: string
}

export class DefaultString {
  @ApiProperty({
    type: 'string',
  })
  @FakeString({
    type: 'default',
  })
  message: string
}
