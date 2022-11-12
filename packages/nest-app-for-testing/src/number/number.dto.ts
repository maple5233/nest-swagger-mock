import { ApiProperty } from '@nestjs/swagger'
import { FakeNumber } from 'nest-swagger-mocker'

export class NormalNumber {
  @ApiProperty({
    type: 'number',
  })
  number: number
}

export class IntegerNumber {
  @ApiProperty({
    type: 'number',
  })
  @FakeNumber({
    min: 1,
    max: 10,
  })
  number: number
}

export class FloatNumber {
  @ApiProperty({
    type: 'number',
  })
  @FakeNumber({
    min: 123,
    max: 10,
    isFloat: true,
    precision: 0.001,
  })
  number: number
}
