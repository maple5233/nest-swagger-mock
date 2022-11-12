import { Controller, Get } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import { FloatNumber, IntegerNumber, NormalNumber } from '@/number/number.dto'

@Controller('number')
export class NumberController {
  @Get('/')
  @ApiResponse({
    type: NormalNumber,
  })
  getNumber() {
    throw new Error('Not implemented')
  }

  @Get('/integer')
  @ApiResponse({
    type: IntegerNumber,
  })
  getIntegerNumber() {
    throw new Error('Not implemented')
  }

  @Get('/float')
  @ApiResponse({
    type: FloatNumber,
  })
  getFloatNumber() {
    throw new Error('Not implemented')
  }
}
