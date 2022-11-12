import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger'
import { ArrayCount, FakeArrayItemClassType, FakeNumber, FakeString } from 'nest-swagger-mocker'

export class NormalObject {
  @ApiProperty({
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      key: {
        type: 'number',
      },
    },
  })
  data: {
    name: string
    key: number
  }
}

class Foo {
  @FakeString({
    type: 'uuid',
  })
  @ApiProperty({
    type: 'string',
  })
  uuid: string
}

class Bar {
  @ApiProperty({
    name: 'data',
    type: Foo,
  })
  data: Foo

  @ApiProperty({
    type: Foo,
  })
  data2: Foo

  @FakeArrayItemClassType(Foo)
  @ArrayCount(2)
  @ApiProperty({
    isArray: true,
    type: Foo,
  })
  dataList: Foo[]

  @FakeString({
    type: 'words',
    minWordsCount: 5,
    maxWordsCount: 10,
  })
  @ApiProperty({
    type: 'string',
  })
  message: string

  @FakeNumber({
    min: 400,
    max: 404,
  })
  @ApiProperty({
    type: 'number',
  })
  status: number
}

export class ObjectWithClass {
  @ApiProperty({
    type: Bar,
  })
  data: Bar
}

class Baz {
  @FakeNumber({
    min: 11,
    max: 20,
  })
  @ApiProperty({
    type: 'number',
  })
  number: number
}

@ApiExtraModels(Baz, Foo)
export class OneOfObject {
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(Foo) },
      { $ref: getSchemaPath(Baz) },
      { type: 'string' },
      { type: 'object', properties: { name: { type: 'string' } } },
    ],
  })
  data: unknown
}

@ApiExtraModels(Baz, Foo)
export class AllOfObject {
  @ApiProperty({
    allOf: [
      { $ref: getSchemaPath(Foo) },
      { $ref: getSchemaPath(Baz) },
      { type: 'object', properties: { name: { type: 'string' } } },
    ],
  })
  data: unknown
}

@ApiExtraModels(Baz, Foo)
export class AnyOfObject {
  @ApiProperty({
    anyOf: [
      { $ref: getSchemaPath(Foo) },
      { $ref: getSchemaPath(Baz) },
      { type: 'object', properties: { name: { type: 'string' } } },
    ],
  })
  data: unknown
}
