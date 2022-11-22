import { AfterHook, FakeOptional } from 'nest-swagger-mocker'

export class ObjectWithOptionalString {
  message?: string
  requiredMessage: string
}

export class ObjectWithFakeOptional {
  @FakeOptional(0.1)
  unlucky?: string
}

@AfterHook<{ message: string }>((response) => {
  response.message = 'hooked'
  return response
})
export class ObjectHookedByAfterHook {
  message: string
}
