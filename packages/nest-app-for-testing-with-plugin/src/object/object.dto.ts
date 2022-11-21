import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger'
import {
  ArrayCount,
  FakeArrayItemClassType,
  FakeNumber,
  FakeString,
  FakeProperty,
} from 'nest-swagger-mocker'

export class NormalObject {
  data: {
    name: string
    key: number
  }
}

class Foo {
  @FakeString({
    type: 'uuid',
  })
  uuid: string
}

class Bar {
  // schema will be { allOf: [ { '$ref': '#/components/schemas/Foo' } ] }
  @ApiProperty({
    name: 'data',
  })
  data: Foo

  @FakeProperty()
  data2: Foo

  @FakeArrayItemClassType(Foo)
  @ArrayCount(2)
  dataList: Foo[]

  @FakeString({
    type: 'words',
    minWordsCount: 5,
    maxWordsCount: 10,
  })
  message: string

  @ArrayCount(6)
  @FakeString({
    type: 'uuid',
  })
  uuidList: string[]

  @FakeNumber({
    min: 400,
    max: 404,
  })
  status: number
}

export class ObjectWithClass {
  @FakeProperty()
  data: Bar
}

class Baz {
  @FakeNumber({
    min: 11,
    max: 20,
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
  data: Foo | Baz | string | { name: string }
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
  data: Foo & Baz & { name: string }
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
  data: Foo | Baz | { name: string }
}
