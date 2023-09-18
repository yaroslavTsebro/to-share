import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {
  IUsersService,
  USER_SERVICE,
} from '../users/service/users-service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_SERVICE) private readonly usersService: IUsersService,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    try {
      return await this.usersService.verifyUser(email, password);
    } catch (error) {
      throw error;
    }
  }
}
