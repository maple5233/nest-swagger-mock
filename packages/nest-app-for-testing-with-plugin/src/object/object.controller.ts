import { Controller, Get } from '@nestjs/common'
import {
  AllOfObject,
  AnyOfObject,
  NormalObject,
  ObjectWithClass,
  OneOfObject,
} from '@/object/object.dto'

@Controller('object')
export class ObjectController {
  @Get('/')
  getNormalObject(): NormalObject {
    throw new Error('Not implemented')
  }

  @Get('/class')
  getObjectWithClass(): ObjectWithClass {
    throw new Error('Not implemented')
  }

  @Get('/oneOf')
  getObjectWithOneOf(): OneOfObject {
    throw new Error('Not implemented')
  }

  @Get('/anyOf')
  getObjectWithAnyOf(): AnyOfObject {
    throw new Error('Not implemented')
  }

  @Get('/allOf')
  getObjectWithAllOf(): AllOfObject {
    throw new Error('Not implemented')
  }
}
