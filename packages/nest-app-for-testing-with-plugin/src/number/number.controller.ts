import { Controller, Get } from '@nestjs/common'
import { FloatNumber, IntegerNumber, NormalNumber } from '@/number/number.dto'

@Controller('number')
export class NumberController {
  @Get('/')
  getNumber(): NormalNumber {
    throw new Error('Not implemented')
  }

  @Get('/integer')
  getIntegerNumber(): IntegerNumber {
    throw new Error('Not implemented')
  }

  @Get('/float')
  getFloatNumber(): FloatNumber {
    throw new Error('Not implemented')
  }
}
