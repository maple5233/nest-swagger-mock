import { Controller, Get } from '@nestjs/common'
import { LuckyBoolean, NormalBoolean } from '@/boolean/bool.dto'

@Controller('bool')
export class BoolController {
  @Get('/')
  getBoolean(): NormalBoolean {
    throw new Error('Not implemented')
  }

  @Get('/luckyBoolean')
  getLuckyBoolean(): LuckyBoolean {
    throw new Error('Not implemented')
  }
}
