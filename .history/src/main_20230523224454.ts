import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './common/util/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = config.host.port;
  await app.listen(PORT);
}
bootstrap();
