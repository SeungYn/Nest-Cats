import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CatsModule } from 'src/cats/cats.module';
import { ConfigService } from '@nestjs/config';
import config from 'src/common/util/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    // JwtModule.registerAsync({
    //   useFactory: async (configService: ConfigService) => {
    //     console.log(config().jwt.secret);
    //     return {
    //       secret: config().jwt.secret, //config().jwt.secret,
    //       signOptions: { expiresIn: configService.get('jwt.expiresIn') }, //config().jwt.expiresIn },
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
    JwtModule.register({
      secret: config().jwt.secret,
      signOptions: {
        expiresIn: config().jwt.expiresIn as number,
      },
    }),
    forwardRef(() => CatsModule),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
