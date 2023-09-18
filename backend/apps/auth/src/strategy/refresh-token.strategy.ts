import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { Request } from 'express';

export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: ITokenPayload) {
    const refreshToken = request.header('Authorization').split(' ')[1];
    const tokenId = request.header('Token-Id');
    return this.authService.getUserIfRefreshTokenMatches(
      refreshToken,
      tokenId,
      payload,
    );
  }
}
