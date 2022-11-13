import { ApiProperty } from '@nestjs/swagger'

enum Enum {
  A = 'A',
  B = 'B',
}

export class EnumResponse {
  data: Enum
}

export class ExampleResponse {
  @ApiProperty({
    example: 'example string',
  })
  data: string
}

export class DefaultResponse {
  @ApiProperty({
    default: 'default string',
  })
  data: string
}

export class ExamplesResponse {
  @ApiProperty({
    examples: {
      example1: 'example1 string',
      example2: 'example2 string',
    },
  })
  data: string
}
