import { Controller, Get } from '@nestjs/common'
import type {
  StringArrayWithCount,
  ClassObjectArray,
  ClassObjectArrayWithRuleAndCount,
  ObjectArray,
  StringArrayWithRuleAndCount,
  StringArray,
  ArrayWithCountRange,
} from '@/array/array.dto'

@Controller('array')
export class ArrayController {
  @Get('/')
  getStringArray(): Promise<StringArray> {
    throw new Error('Not implemented')
  }

  @Get('/count')
  getStringArrayWithCount(): Promise<StringArrayWithCount> {
    throw new Error('Not implemented')
  }

  @Get('/ruleAndCount')
  getStringArrayWithRuleAndCount(): Promise<StringArrayWithRuleAndCount> {
    throw new Error('Not implemented')
  }

  @Get('/object')
  getObjectArray(): Promise<ObjectArray> {
    throw new Error('Not implemented')
  }

  @Get('/classObject')
  getClassObjectArray(): Promise<ClassObjectArray> {
    throw new Error('Not implemented')
  }

  @Get('/classObjectWithRuleAndCount')
  getClassObjectArrayWithRuleAndCount(): Promise<ClassObjectArrayWithRuleAndCount> {
    throw new Error('Not implemented')
  }

  @Get('/countRange')
  getStringArrayWithCountRange(): Promise<ArrayWithCountRange> {
    throw new Error('Not implemented')
  }
}
