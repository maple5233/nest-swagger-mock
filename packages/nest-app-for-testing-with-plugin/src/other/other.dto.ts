import { AfterHook } from 'nest-swagger-mocker'

export class ObjectWithOptionalString {
  message?: string
  requiredMessage: string
}

@AfterHook<{ message: string }>((response) => {
  response.message = 'hooked'
  return response
})
export class ObjectHookedByAfterHook {
  message: string
}
