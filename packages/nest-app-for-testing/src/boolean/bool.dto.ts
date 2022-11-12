import { ApiProperty } from '@nestjs/swagger'
import { FakeBoolean } from 'nest-swagger-mocker'

export class NormalBoolean {
  @ApiProperty({
    type: 'boolean',
  })
  boolean: boolean
}

export class LuckyBoolean {
  @ApiProperty({
    type: 'boolean',
  })
  @FakeBoolean({
    probability: 0.9,
  })
  boolean: boolean
}
