import { Controller, Get } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import {
  DefaultString,
  NormalString,
  RandomString,
  TemplateString,
  UUIDString,
  WordsString,
} from '@/string/string.dto'

@Controller('string')
export class StringController {
  @Get('/')
  @ApiResponse({
    type: NormalString,
  })
  getNormalString() {
    throw new Error('Not implemented')
  }

  @Get('/uuid')
  @ApiResponse({
    type: UUIDString,
  })
  getUUIDString() {
    throw new Error('Not implemented')
  }

  @Get('/words')
  @ApiResponse({
    type: WordsString,
  })
  getWordsString() {
    throw new Error('Not implemented')
  }

  @Get('/random')
  @ApiResponse({
    type: RandomString,
  })
  getRandomString() {
    throw new Error('Not implemented')
  }

  @Get('/template')
  @ApiResponse({
    type: TemplateString,
  })
  getTemplateString() {
    throw new Error('Not implemented')
  }

  @Get('/default')
  @ApiResponse({
    type: DefaultString,
  })
  getDefaultString() {
    throw new Error('Not implemented')
  }

  @Get('/schema')
  @ApiResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
    },
  })
  getSchema() {
    throw new Error('Not implemented')
  }
}
