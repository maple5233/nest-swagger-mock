import { FakeNumber } from 'nest-swagger-mocker'

export class NormalNumber {
  number: number
}

export class IntegerNumber {
  @FakeNumber({
    min: 1,
    max: 10,
  })
  number: number
}

export class FloatNumber {
  @FakeNumber({
    min: 123,
    max: 10,
    isFloat: true,
    precision: 0.001,
  })
  number: number
}
