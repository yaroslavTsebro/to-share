import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { CurrentUser } from '@app/common';
import User from '../users/entity/user.entity';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(user);

    response.cookie('Authentication', tokens.accessToken, {
      httpOnly: true,
      expires: this.configService.get('JWT_EXPIRATION'),
    });
    response.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      expires: this.configService.get('JWT_REFRESH_EXPIRATION'),
    });

    response.send(tokens);
  }

  @Post('register')
  @UseGuards(LocalAuthGuard)
  async register(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(user);
    response.cookie('Authentication', tokens.accessToken, {
      httpOnly: true,
      expires: this.configService.get('JWT_EXPIRATION'),
    });
    response.send(tokens);
  }
}
