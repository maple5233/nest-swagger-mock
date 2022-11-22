import { Controller, Get } from '@nestjs/common'
import {
  ObjectHookedByAfterHook,
  ObjectWithFakeOptional,
  ObjectWithOptionalString,
} from '@/other/other.dto'

@Controller('other')
export class OtherController {
  @Get('/optional')
  getObjectWithOptionalString(): ObjectWithOptionalString {
    throw new Error('not implemented')
  }

  @Get('/fake-optional')
  getObjectWithFakeOptional(): ObjectWithFakeOptional {
    throw new Error('not implemented')
  }

  @Get('/hooked')
  getObjectHookedByAfterHook(): ObjectHookedByAfterHook {
    throw new Error('not implemented')
  }
}
