import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  const swOptions = new DocumentBuilder()
    .setTitle('Pragma Tech Assignment')
    .setVersion(process.env.npm_package_version)
    .build()

  const swDocument = SwaggerModule.createDocument(app, swOptions)
  SwaggerModule.setup('api/docs', app, swDocument)

  await app.listen(3000);
}

bootstrap();
