import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './common/util/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { SuccessInterceptor } from './common/intercaptors/success.intercaptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // class validation 등록
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const PORT = config().host.port;
  await app.listen(PORT);
}
bootstrap();
