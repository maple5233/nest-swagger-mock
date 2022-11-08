import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger'
import {
  ArrayCount,
  FakeNumber,
  FakeString,
  FakeBoolean,
  FakeArrayItemClassType,
} from 'nest-swagger-mocker'

export class HelloMessageResponse {
  @ApiProperty({
    description: 'Hello message',
    type: String,
  })
  @FakeString({
    type: 'words',
    maxWordsCount: 10,
  })
  message: string
}

export class MoreInnerObject {
  @ApiProperty({
    type: 'string',
  })
  @FakeString({
    type: 'words',
    maxWordsCount: 10,
    minWordsCount: 5,
  })
  name: string

  @ApiProperty({
    type: 'number',
  })
  @FakeNumber({
    min: 1,
    max: 100,
    isFloat: true,
  })
  age: number
}

export class InnerObject {
  @FakeString({
    type: 'uuid',
  })
  @ApiProperty({
    type: 'string',
  })
  test: string

  @FakeNumber({
    min: 1,
    max: 10,
  })
  @ApiProperty({
    isArray: true,
    type: 'number',
  })
  test2: number[]

  @ApiProperty({
    /**
     * For $ref, add the name property will cause the schema to change form
     * {
     *   $ref: '#/components/schemas/MoreInnerObject'
     * }
     * to
     * {
     *   allOf: [
     *    '$ref: '#/components/schemas/MoreInnerObject'
     *    ]
     * }
     */
    name: 'innerObject',
    type: MoreInnerObject,
  })
  innerObject: MoreInnerObject

  @ApiProperty({
    type: MoreInnerObject,
  })
  innerObject2: MoreInnerObject
}

export class NormalResponse {
  /* ====== string part ====== */

  @ApiProperty({
    type: 'string',
  })
  message: string

  @ApiProperty({
    type: 'string',
  })
  @FakeString({
    type: 'template',
    template: 'Hello {{name.lastName}}, {{name.firstName}} {{name.suffix}}',
  })
  templateStringMessage: string

  @ApiProperty({
    type: 'string',
  })
  @FakeString({
    type: 'random',
    minLength: 110,
    maxLength: 20,
  })
  randomLengthStringMessage: string

  @ApiProperty({
    name: 'uuidMessage',
    type: 'string',
  })
  @FakeString({
    type: 'uuid',
  })
  uuidMessage: string

  @ApiProperty({
    type: 'string',
  })
  @FakeString({
    type: 'words',
    minWordsCount: 3,
    maxWordsCount: 5,
  })
  wordsMessage: string

  /* ====== number part ====== */

  @ApiProperty({
    type: 'number',
  })
  code: number

  @FakeNumber({
    min: 200,
    max: 100,
  })
  @ApiProperty({
    type: 'number',
  })
  integer: number

  @FakeNumber({
    min: 100,
    max: 200,
    isFloat: true,
    precision: 0.1,
  })
  @ApiProperty({
    type: 'number',
  })
  float: number

  /* ====== boolean part ====== */

  @ApiProperty({
    type: 'boolean',
    required: false,
  })
  success: boolean

  @FakeBoolean({
    probability: 0.9,
  })
  @ApiProperty({
    type: 'boolean',
    required: false,
  })
  veryLucky: boolean

  /* ====== enum, example and default part ====== */

  @ApiProperty({
    type: 'enum',
    enum: ['A', 'B'],
  })
  enum: 'A' | 'B'

  @ApiProperty({
    example: 'example',
  })
  example: string

  @ApiProperty({
    examples: ['example1', 'example2'],
  })
  oneOfExamples: string

  @ApiProperty({
    default: 'default',
  })
  default: string

  /* ====== array part ====== */

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
  })
  @ArrayCount(2)
  strings: string[]

  // rule only works when the array's items are primitive type, if not, pls use class
  @FakeString({
    type: 'template',
    template: 'Hello {{name.lastName}}',
  })
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
  })
  stringsWithRule: string[]

  /* ====== object part ====== */

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
  object: {
    name: string
    key: number
  }

  @ApiProperty({
    type: InnerObject,
  })
  objectWithClass: InnerObject

  @FakeArrayItemClassType(InnerObject)
  @ApiProperty({
    isArray: true,
    type: InnerObject,
  })
  objectsWithClass: InnerObject[]
}

export class Bar {
  @ApiProperty({
    type: 'string',
  })
  @FakeString({
    type: 'random',
    maxLength: 10,
  })
  message2: string

  @ApiProperty({
    type: 'string',
  })
  @FakeString({
    type: 'uuid',
  })
  message3: string
}

@ApiExtraModels(Bar, HelloMessageResponse)
// @FakeExtraClassTypes([Bar, HelloMessageResponse])
export class ResponseWithPropertyWhichUseAllOf {
  @ApiProperty({
    allOf: [
      { $ref: getSchemaPath(HelloMessageResponse) },
      {
        $ref: getSchemaPath(Bar),
      },
      {
        properties: {
          message4: {
            type: 'string',
          },
        },
      },
    ],
  })
  allOf: Bar & HelloMessageResponse & { message3: string }
}

@ApiExtraModels(Bar, HelloMessageResponse)
export class ResponseWithPropertyWhichUseOneOf {
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(HelloMessageResponse) },
      {
        $ref: getSchemaPath(Bar),
      },
    ],
  })
  oneOf: Bar | HelloMessageResponse
}

@ApiExtraModels(Bar, HelloMessageResponse)
export class ResponseWithPropertyWhichUseAnyOf {
  @ApiProperty({
    anyOf: [
      { $ref: getSchemaPath(HelloMessageResponse) },
      {
        $ref: getSchemaPath(Bar),
      },
    ],
  })
  anyOf: Bar | HelloMessageResponse
}
