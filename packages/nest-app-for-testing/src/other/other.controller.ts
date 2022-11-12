import { Controller, Get } from '@nestjs/common'
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger'
import { Qux, ObjectHookedByAfterHook, ObjectWithOptionalString } from '@/other/other.dto'

@Controller('other')
export class OtherController {
  @Get('/optional')
  @ApiResponse({
    type: ObjectWithOptionalString,
  })
  getObjectWithOptionalString() {
    throw new Error('not implemented')
  }

  @Get('/hooked')
  @ApiResponse({
    type: ObjectHookedByAfterHook,
  })
  getObjectHookedByAfterHook() {
    throw new Error('not implemented')
  }

  @Get('/schema-out-side')
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
  getObjectWithSchemaOutSide() {
    throw new Error('not implemented')
  }

  @ApiExtraModels(Qux)
  @Get('/ref-out-side')
  @ApiResponse({
    schema: {
      oneOf: [
        {
          $ref: getSchemaPath(Qux),
        },
      ],
    },
  })
  getObjectWithRefOutSide() {
    throw new Error('not implemented')
  }
}
