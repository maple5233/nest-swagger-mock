import { FakeBoolean } from 'nest-swagger-mocker'

export class NormalBoolean {
  boolean: boolean
}

export class LuckyBoolean {
  @FakeBoolean({
    probability: 0.9,
  })
  boolean: boolean
}
