import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { config } from './common/util/config';

@Module({
  imports: [
    //모듈 안에서 환경변수를 사용하려면 이렇게 해줘야함
    ConfigModule.forRoot({
      load: [config],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = config().mode === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // 이렇게 세팅시 몽고디비 로그가 찍힘
    mongoose.set('debug', this.isDev);
  }
}
