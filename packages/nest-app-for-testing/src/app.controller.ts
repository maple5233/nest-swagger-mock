import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { NormalResponse, HelloMessageResponse, ResponseWithPropertyWhichUseAllOf } from '@/app.dto'
import { ApiResponse } from '@nestjs/swagger'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): HelloMessageResponse {
    return {
      message: this.appService.getHello(),
    }
  }

  @Get('normal')
  @ApiResponse({
    type: NormalResponse,
  })
  getNormal() {
    throw new Error('Not implemented')
  }

  @Get('allOf')
  @ApiResponse({
    type: ResponseWithPropertyWhichUseAllOf,
  })
  getAllOf() {
    throw new Error('Not implemented')
  }
}
