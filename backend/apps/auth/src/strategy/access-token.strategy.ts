import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '../interface/access-token-payload.interface';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../service/auth.service';
import User from '../users/entity/user.entity';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          console.log(request?.cookies?.Authentication);
          return (
            request?.cookies?.Authentication ||
            request?.Authentication ||
            request?.headers.Authentication
          );
        },
      ]),
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  validate(payload: AccessTokenPayload): Promise<User> {
    console.log(payload);
    return this.authService.getById(payload.id);
  }
}
