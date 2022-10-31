import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { GetNormalResponse, HelloMessageResponse } from '@/app.dto'
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
    type: GetNormalResponse,
  })
  getNormal() {
    throw new Error('Not implemented')
  }
}
