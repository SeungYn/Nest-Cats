import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';
import { CatsRepository } from 'src/cats/cats.repository';
import config from 'src/common/util/config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.secret'), //config().jwt.secret,
      ignoreExpiration: false,
    });
  }

  //strategy는 validate를 바로 수행해줌
  async validate(payload: Payload) {
    console.log(payload, '검사');
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );

    if (cat) return cat; // 이렇게 리턴해주면 request.user 에 cat이 들어가게 됨
    else throw new UnauthorizedException('권한이 없어용');
  }
}
