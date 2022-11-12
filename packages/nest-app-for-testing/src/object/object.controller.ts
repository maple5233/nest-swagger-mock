import { Controller, Get } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
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
  @ApiResponse({
    type: NormalObject,
  })
  getNormalObject() {
    throw new Error('Not implemented')
  }

  @Get('/class')
  @ApiResponse({
    type: ObjectWithClass,
  })
  getObjectWithClass() {
    throw new Error('Not implemented')
  }

  @Get('/oneOf')
  @ApiResponse({
    type: OneOfObject,
  })
  getObjectWithOneOf() {
    throw new Error('Not implemented')
  }

  @Get('/anyOf')
  @ApiResponse({
    type: AnyOfObject,
  })
  getObjectWithAnyOf() {
    throw new Error('Not implemented')
  }

  @Get('/allOf')
  @ApiResponse({
    type: AllOfObject,
  })
  getObjectWithAllOf() {
    throw new Error('Not implemented')
  }
}
