import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import User from '../users/entity/user.entity';
import { AccessTokenPayload } from '../interface/access-token-payload.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenPayload } from '../interface/refresh-token-payload.interface';
import {
  IUsersService,
  USER_SERVICE,
} from '../users/service/users-service.interface';
import { CreateUserDto } from '../users/entity/dto/create-user.dto';
import {
  ITokenService,
  TOKEN_SERVICE,
} from '../token/service/token-service.interface';
import { ChangeUsernameDto } from '../users/entity/dto/change-username.dto';
import { UserCommentDto } from '@app/common';

export type Tokens = { accessToken: string; refreshToken: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(USER_SERVICE) private readonly usersService: IUsersService,
    @Inject(TOKEN_SERVICE) private readonly tokenService: ITokenService,
    private readonly jwtService: JwtService,
  ) {}

  async changeUsername(user: User, dto: ChangeUsernameDto) {
    return await this.usersService.changeUsername(user.id, dto.username);
  }

  async delete(user: User) {
    return await this.usersService.delete(user.id);
  }

  async logout(user: User) {
    await this.tokenService.delete(user.id);
  }

  async getById(userId: number): Promise<User> {
    return this.usersService.getById(userId);
  }

  async getUsersByIds(ids: number[]): Promise<UserCommentDto[]> {
    return await this.usersService.getByIdsForComments(ids);
  }

  async getTokens(user: User): Promise<Tokens> {
    try {
      const accessTokenPayload: AccessTokenPayload = {
        id: user.id,
        username: user.username,
      };
      const refreshTokenPayload: RefreshTokenPayload = {
        id: user.id,
      };

      const expires = new Date();
      expires.setSeconds(
        expires.getSeconds() + this.configService.get('JWT_ACCESS_EXPIRATION'),
      );

      const accessToken = this.jwtService.sign(accessTokenPayload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        subject: user.id.toString(),
        expiresIn: expires.getSeconds(),
      });

      expires.setSeconds(
        expires.getSeconds() + this.configService.get('JWT_REFRESH_EXPIRATION'),
      );
      const refreshToken = this.jwtService.sign(refreshTokenPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        subject: user.id.toString(),
        expiresIn: expires.getSeconds(),
      });

      await this.tokenService.createOrUpdate(
        { token: refreshToken, userId: user.id },
        user,
      );

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async register(dto: CreateUserDto): Promise<Tokens> {
    try {
      const user = await this.usersService.create(dto);
      if (!user) throw new BadRequestException('An Error occured');
      const tokens = await this.getTokens(user);
      return tokens;
    } catch (error) {
      throw error;
    }
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    id: number,
  ): Promise<User> {
    const token = this.tokenService.getByUserIdAndToken(id, refreshToken);
    return (await token).user;
  }
}
