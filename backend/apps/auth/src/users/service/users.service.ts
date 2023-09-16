import { Injectable } from '@nestjs/common';
import { IUsersService } from './users-service.interface';
import { CreateUserDto } from '../entity/dto/create-user.dto';
import User from '../entity/user.entity';

@Injectable()
export class UsersService implements IUsersService {
  async create(dto: CreateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
