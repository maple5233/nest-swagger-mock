import { Controller, Get } from '@nestjs/common'
import { ObjectHookedByAfterHook, ObjectWithOptionalString } from '@/other/other.dto'

@Controller('other')
export class OtherController {
  @Get('/optional')
  getObjectWithOptionalString(): ObjectWithOptionalString {
    throw new Error('not implemented')
  }

  @Get('/hooked')
  getObjectHookedByAfterHook(): ObjectHookedByAfterHook {
    throw new Error('not implemented')
  }
}
