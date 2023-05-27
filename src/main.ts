import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './common/util/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { SuccessInterceptor } from './common/intercaptors/success.intercaptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // class validation 등록
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  // prefix를 붙여서 파일에 접근가능하게 해줌 http://localhost:8000/media/cats/aaa.png
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });

  app.use(
    ['/api', '/docs-json', '/docs1'],
    expressBasicAuth({
      challenge: true,
      users: { admin1: 'admin1' },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs1', app, document);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const PORT = config().host.port;
  await app.listen(PORT);
}
bootstrap();
