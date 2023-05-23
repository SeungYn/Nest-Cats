import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './common/util/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { SuccessInterceptor } from './common/intercaptors/success.intercaptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // class validation 등록
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  const PORT = config().host.port;
  await app.listen(PORT);
}
bootstrap();
