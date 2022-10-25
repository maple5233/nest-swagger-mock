import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger'

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

  await app.listen(3000)
}

bootstrap().then(() => console.log('Application start is complete'))
