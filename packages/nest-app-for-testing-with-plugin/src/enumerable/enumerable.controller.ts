import { Controller, Get } from '@nestjs/common'
import {
  DefaultResponse,
  EnumResponse,
  ExampleResponse,
  ExamplesResponse,
} from '@/enumerable/enumerable.dto'

@Controller('enumerable')
export class EnumerableController {
  @Get('/enum')
  getEnum(): EnumResponse {
    throw new Error('Not implemented')
  }

  @Get('/example')
  getExample(): ExampleResponse {
    throw new Error('Not implemented')
  }

  @Get('/default')
  getDefault(): DefaultResponse {
    throw new Error('Not implemented')
  }

  @Get('/examples')
  getExamples(): ExamplesResponse {
    throw new Error('Not implemented')
  }
}
