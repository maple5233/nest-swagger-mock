import { ApiProperty } from '@nestjs/swagger'
import { AfterHook, FakeString, CustomMocking, FakeOptional } from 'nest-swagger-mocker'

export class ObjectWithOptionalString {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  message: string

  @ApiProperty({
    type: 'string',
  })
  requiredMessage: string
}

export class ObjectWithFakeOptional {
  @FakeOptional(0.1)
  @ApiProperty({
    type: 'string',
    required: false,
  })
  unlucky?: string
}

@AfterHook<{ message: string }>((response) => {
  response.message = 'hooked'
  return response
})
export class ObjectHookedByAfterHook {
  @ApiProperty({
    type: 'string',
  })
  message: string
}

export class Qux {
  @FakeString({
    type: 'uuid',
  })
  @ApiProperty({
    type: 'string',
  })
  message: string
}

@CustomMocking((faker) => {
  const oldLocale = faker.locale
  faker.locale = 'zh_CN'
  const result = {
    name: faker.name.fullName(),
  }
  faker.locale = oldLocale
  return result
})
export class Custom {
  @ApiProperty({
    type: 'string',
  })
  test: string
}
