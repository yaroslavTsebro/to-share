import { Injectable } from '@nestjs/common';
import User from '../users/entity/user.entity';
import { AccessTokenPayload } from '../interface/access-token-payload.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenPayload } from '../interface/refresh-token-payload.interface';

export type Tokens = { accessToken: string; refreshToken: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async login(user: User): Promise<Tokens> {
    const tokenPayload: AccessTokenPayload = {
      id: user.id.toString(),
      username: user.username,
    };

    const refreshTokenPayload: RefreshTokenPayload = {
      id: user.id.toString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const accessToken = this.jwtService.sign(tokenPayload);

    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_REFRESH_EXPIRATION'),
    );
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      subject: user.id.toString(),
      expiresIn: expires.getSeconds(),
    });

    return { accessToken, refreshToken };
  }
}
