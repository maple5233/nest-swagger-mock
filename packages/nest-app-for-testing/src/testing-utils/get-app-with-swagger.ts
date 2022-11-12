import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Test } from '@nestjs/testing'
import type { TestingModule } from '@nestjs/testing'
import { MockInterceptorFactory } from 'nest-swagger-mocker'

export const getAppWithSwagger = async (
  controller: NonNullable<Parameters<typeof Test.createTestingModule>[0]['controllers']>[0],
) => {
  const moduleRef: TestingModule = await Test.createTestingModule({
    controllers: [controller],
  }).compile()

  const app = moduleRef.createNestApplication()
  const options = new DocumentBuilder().build()
  const swaggerDocument = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, swaggerDocument)

  app.useGlobalInterceptors(
    MockInterceptorFactory.create({ document: swaggerDocument, shouldMockChecker: () => true }),
  )

  await app.init()

  return app
}
