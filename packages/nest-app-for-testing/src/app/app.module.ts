import { Module } from '@nestjs/common'
import { ArrayController } from '@/array/array.controller'
import { ObjectController } from '@/object/object.controller'
import { NumberController } from '@/number/number.controller'
import { StringController } from '@/string/string.controller'
import { BoolController } from '@/boolean/bool.controller'
import { OtherController } from '@/other/other.controller'
import { EnumerableController } from '@/enumerable/enumerable.controller'

@Module({
  controllers: [
    NumberController,
    BoolController,
    StringController,
    EnumerableController,
    ArrayController,
    ObjectController,
    OtherController,
  ],
})
export class AppModule {}
