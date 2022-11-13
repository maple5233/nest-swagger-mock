import { ArrayCount, FakeArrayItemClassType, FakeString } from 'nest-swagger-mocker'
import { ApiProperty } from '@nestjs/swagger'

export class StringArray {
  @FakeString({
    type: 'uuid',
  })
  array: string[]
}

export class StringArrayWithCount {
  @ArrayCount(10)
  array: string[]
}

export class StringArrayWithRuleAndCount {
  @ArrayCount(30)
  @FakeString({
    type: 'template',
    template: 'I flipped the coin and got: {{helpers.arrayElement(["heads", "tails"])}}',
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
  @FakeArrayItemClassType(StringArray)
  array: StringArray[]
}

export class ClassObjectArrayWithRuleAndCount {
  @FakeArrayItemClassType(StringArrayWithRuleAndCount)
  @ArrayCount(10)
  array: StringArrayWithRuleAndCount[]
}
