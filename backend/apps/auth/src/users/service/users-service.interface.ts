import { CreateUserDto } from '../entity/dto/create-user.dto';
import User from '../entity/user.entity';

export const USER_SERVICE = Symbol('IUserService');

export interface IUsersService {
  create(dto: CreateUserDto): User;
}
