import { ApiProperty } from '@nestjs/swagger'
import { ArrayCount, FakeArrayItemClassType, FakeString } from 'nest-swagger-mocker'

export class StringArray {
  @ApiProperty({
    isArray: true,
    type: 'string',
  })
  array: string[]
}

export class StringArrayWithCount {
  @ArrayCount(10)
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
  })
  array: string[]
}

export class StringArrayWithRuleAndCount {
  @ArrayCount(30)
  @FakeString({
    type: 'template',
    template: 'I flipped the coin and got: {{helpers.arrayElement(["heads", "tails"])}}',
  })
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
  })
  array: string[]
}

export class ObjectArray {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
      },
    },
  })
  array: {
    name: string
  }[]
}

export class ClassObjectArray {
  @ApiProperty({
    isArray: true,
    type: StringArray,
  })
  array: StringArray[]
}

export class ClassObjectArrayWithRuleAndCount {
  @FakeArrayItemClassType(StringArrayWithRuleAndCount)
  @ArrayCount(10)
  @ApiProperty({
    isArray: true,
    type: StringArrayWithRuleAndCount,
  })
  array: StringArrayWithRuleAndCount[]
}
