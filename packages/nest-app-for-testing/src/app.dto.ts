import { ApiProperty } from '@nestjs/swagger'

export class HelloMessageResponse {
  message: string
}

export class GetNormalResponse {
  @ApiProperty({
    type: 'string',
  })
  message: string

  @ApiProperty({
    type: 'number',
  })
  code: number

  @ApiProperty({
    type: 'boolean',
  })
  success: boolean

  @ApiProperty({
    type: 'enum',
    enum: ['A', 'B'],
  })
  enum: 'A' | 'B'

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
  })
  stringArray: string[]

  @ApiProperty({
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
    },
  })
  object: {
    name: string
  }
}
