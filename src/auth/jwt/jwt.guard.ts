import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// AuthGuard 전략을 자동으로 실행하는 기능이 있음
export class JwtAuthGuard extends AuthGuard('jwt') {}
