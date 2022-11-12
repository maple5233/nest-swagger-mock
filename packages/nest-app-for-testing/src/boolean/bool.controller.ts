import { Controller, Get } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { LuckyBoolean, NormalBoolean } from '@/boolean/bool.dto'

@Controller('bool')
export class BoolController {
  @Get('/')
  @ApiResponse({
    type: NormalBoolean,
  })
  getBoolean() {
    throw new Error('Not implemented')
  }

  @Get('/luckyBoolean')
  @ApiResponse({
    type: LuckyBoolean,
  })
  getLuckyBoolean() {
    throw new Error('Not implemented')
  }
}
