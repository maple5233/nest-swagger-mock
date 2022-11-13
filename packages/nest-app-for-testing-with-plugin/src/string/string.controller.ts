import { Controller, Get } from '@nestjs/common'
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
  getNormalString(): NormalString {
    throw new Error('Not implemented')
  }

  @Get('/uuid')
  getUUIDString(): UUIDString {
    throw new Error('Not implemented')
  }

  @Get('/words')
  getWordsString(): WordsString {
    throw new Error('Not implemented')
  }

  @Get('/random')
  getRandomString(): RandomString {
    throw new Error('Not implemented')
  }

  @Get('/template')
  getTemplateString(): TemplateString {
    throw new Error('Not implemented')
  }

  @Get('/default')
  getDefaultString(): DefaultString {
    throw new Error('Not implemented')
  }
}
