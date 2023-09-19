import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService, Tokens } from '../service/auth.service';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { CurrentUser } from '@app/common';
import User from '../users/entity/user.entity';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../users/entity/dto/create-user.dto';
import { AccessTokenGuard } from '../guard/access-token.guard';
import { RefreshTokenGuard } from '../guard/refresh-token.guard';
import { ChangeUsernameDto } from '../users/entity/dto/change-username.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.getTokens(user);

    this.addTokensToCookies(response, tokens);
    response.send(tokens);
  }

  @Post('register')
  async register(
    @Res({ passthrough: true }) response: Response,
    @Body() user: CreateUserDto,
  ) {
    const tokens = await this.authService.register(user);

    this.addTokensToCookies(response, tokens);
    response.send(tokens);
  }

  @Post('logout')
  @UseGuards(AccessTokenGuard)
  async logout(
    @Res({ passthrough: true }) response: Response,
    @CurrentUser() user: User,
  ) {
    await this.authService.logout(user);
    this.removeTokensToCookies(response);
    return user;
  }

  @Get('profile')
  @UseGuards(AccessTokenGuard)
  async profile(@CurrentUser() user: User) {
    return user;
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @CurrentUser() user: User,
  ) {
    const tokens = await this.authService.getTokens(user);

    this.addTokensToCookies(response, tokens);
    response.send(tokens);
  }

  @Post('change-username')
  @UseGuards(AccessTokenGuard)
  async changeUsername(
    @CurrentUser() user: User,
    @Body() dto: ChangeUsernameDto,
  ) {
    return await this.authService.changeUsername(user, dto);
  }

  @Delete()
  @UseGuards(AccessTokenGuard)
  async deleteAccount(@CurrentUser() user: User) {
    return await this.authService.delete(user);
  }

  @UseGuards(AccessTokenGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }

  private addTokenToCookies(
    response: Response,
    key: string,
    token: string,
    expires: Date,
  ) {
    response.cookie(key, token, {
      httpOnly: true,
      expires: expires,
    });
  }

  private addAccessTokenToCookies(response: Response, token: string) {
    const accessTokenExpires = new Date();
    accessTokenExpires.setSeconds(
      accessTokenExpires.getSeconds() +
        this.configService.get<number>('JWT_ACCESS_EXPIRATION'),
    );
    this.addTokenToCookies(
      response,
      'Authentication',
      token,
      accessTokenExpires,
    );
  }

  private addRefreshTokenToCookies(response: Response, token: string) {
    const refreshTokenExpires = new Date();
    refreshTokenExpires.setSeconds(
      refreshTokenExpires.getSeconds() +
        this.configService.get<number>('JWT_REFRESH_EXPIRATION'),
    );
    this.addTokenToCookies(
      response,
      'refreshToken',
      token,
      refreshTokenExpires,
    );
  }

  private addTokensToCookies(response: Response, tokens: Tokens) {
    this.addAccessTokenToCookies(response, tokens.accessToken);
    this.addRefreshTokenToCookies(response, tokens.refreshToken);
  }

  private removeTokensToCookies(response: Response) {
    response.clearCookie('Authentication');
    response.clearCookie('refreshToken');
  }
}
