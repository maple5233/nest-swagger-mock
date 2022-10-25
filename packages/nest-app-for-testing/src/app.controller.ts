import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Response } from '@/app.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Response {
    return {
      message: this.appService.getHello(),
    }
  }
}
