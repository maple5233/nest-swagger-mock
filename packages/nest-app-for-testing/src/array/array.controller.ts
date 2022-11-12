import { Controller, Get } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'
import {
  ClassObjectArray,
  ClassObjectArrayWithRuleAndCount,
  ObjectArray,
  StringArray,
  StringArrayWithCount,
  StringArrayWithRuleAndCount,
} from '@/array/array.dto'

@Controller('array')
export class ArrayController {
  @Get('/')
  @ApiResponse({
    type: StringArray,
  })
  getStringArray() {
    throw new Error('Not implemented')
  }

  @Get('/count')
  @ApiResponse({
    type: StringArrayWithCount,
  })
  getStringArrayWithCount() {
    throw new Error('Not implemented')
  }

  @Get('/ruleAndCount')
  @ApiResponse({
    type: StringArrayWithRuleAndCount,
  })
  getStringArrayWithRuleAndCount() {
    throw new Error('Not implemented')
  }

  @Get('/object')
  @ApiResponse({
    type: ObjectArray,
  })
  getObjectArray() {
    throw new Error('Not implemented')
  }

  @Get('/classObject')
  @ApiResponse({
    type: ClassObjectArray,
  })
  getClassObjectArray() {
    throw new Error('Not implemented')
  }

  @Get('/classObjectWithRuleAndCount')
  @ApiResponse({
    type: ClassObjectArrayWithRuleAndCount,
  })
  getClassObjectArrayWithRuleAndCount() {
    throw new Error('Not implemented')
  }
}
