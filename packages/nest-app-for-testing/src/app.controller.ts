import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import {
  NormalResponse,
  HelloMessageResponse,
  ResponseWithPropertyWhichUseAllOf,
  Bar,
  ResponseWithPropertyWhichUseOneOf,
  ResponseWithPropertyWhichUseAnyOf,
  ResponseWithAfterResponseHook,
} from '@/app.dto'
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger'

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
    type: NormalResponse,
  })
  getNormal() {
    throw new Error('Not implemented')
  }

  @Get('allOf')
  @ApiResponse({
    type: ResponseWithPropertyWhichUseAllOf,
  })
  getAllOf() {
    throw new Error('Not implemented')
  }

  @Get('allOf2')
  @ApiExtraModels(Bar, HelloMessageResponse)
  @ApiResponse({
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(HelloMessageResponse),
        },
        {
          $ref: getSchemaPath(Bar),
        },
        {
          properties: {
            message4: {
              type: 'string',
            },
          },
        },
      ],
    },
  })
  getAllOf2() {
    throw new Error('Not implemented')
  }

  @ApiExtraModels(Bar, HelloMessageResponse)
  @Get('oneOf')
  @ApiResponse({
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(HelloMessageResponse),
        },
        {
          $ref: getSchemaPath(Bar),
        },
      ],
    },
  })
  getOneOf() {
    throw new Error('Not implemented')
  }

  @ApiExtraModels(Bar, HelloMessageResponse)
  @Get('oneOf2')
  @ApiResponse({
    type: ResponseWithPropertyWhichUseOneOf,
  })
  getOneOf2() {
    throw new Error('Not implemented')
  }

  @ApiExtraModels(Bar, HelloMessageResponse)
  @Get('anyOf')
  @ApiResponse({
    schema: {
      anyOf: [
        {
          $ref: getSchemaPath(HelloMessageResponse),
        },
        {
          $ref: getSchemaPath(Bar),
        },
      ],
    },
  })
  getAnyOf() {
    throw new Error('Not implemented')
  }

  @ApiExtraModels(Bar, HelloMessageResponse)
  @Get('anyOf2')
  @ApiResponse({
    type: ResponseWithPropertyWhichUseAnyOf,
  })
  getAnyOf2() {
    throw new Error('Not implemented')
  }

  @Get('hooked')
  @ApiResponse({
    type: ResponseWithAfterResponseHook,
  })
  getHooked() {
    throw new Error('Not implemented')
  }
}
