import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app.module'
import type { SwaggerDocumentOptions } from '@nestjs/swagger'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { MockInterceptorFactory } from 'nest-swagger-mocker'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const options = new DocumentBuilder()
    .setTitle('server document')
    .setDescription('API description')
    .setVersion('1.0')
    .build()

  const config: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      `${controllerKey}${methodKey.replace(/^\S/, (s) => s.toUpperCase())}`,
  }

  const swaggerDocument = SwaggerModule.createDocument(app, options, config)
  SwaggerModule.setup('api', app, swaggerDocument)

  app.useGlobalInterceptors(
    MockInterceptorFactory.create({
      document: swaggerDocument,
      shouldMockChecker: () => true,
    }),
  )

  await app.listen(2333)
}

bootstrap().then(() => console.log('Application start is complete'))
