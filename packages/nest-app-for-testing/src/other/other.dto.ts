import { ApiProperty } from '@nestjs/swagger'
import { AfterHook, FakeString } from 'nest-swagger-mocker'

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

export class Foo {
  @FakeString({
    type: 'uuid',
  })
  @ApiProperty({
    type: 'string',
  })
  message: string
}
