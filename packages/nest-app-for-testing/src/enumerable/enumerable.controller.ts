import { Controller, Get } from '@nestjs/common'
import {
  DefaultResponse,
  EnumResponse,
  ExampleResponse,
  ExamplesResponse,
} from '@/enumerable/enumerable.dto'
import { ApiResponse } from '@nestjs/swagger'

@Controller('enumerable')
export class EnumerableController {
  @Get('/enum')
  @ApiResponse({
    type: EnumResponse,
  })
  getEnum() {
    throw new Error('Not implemented')
  }

  @Get('/example')
  @ApiResponse({
    type: ExampleResponse,
  })
  getExample() {
    throw new Error('Not implemented')
  }

  @Get('/default')
  @ApiResponse({
    type: DefaultResponse,
  })
  getDefault() {
    throw new Error('Not implemented')
  }

  @Get('/examples')
  @ApiResponse({
    type: ExamplesResponse,
  })
  getExamples() {
    throw new Error('Not implemented')
  }
}
