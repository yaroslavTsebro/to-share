import { CreateUserDto } from '../entity/dto/create-user.dto';

export const USER_SERVICE = Symbol('IUserService');

export interface IUsersService {
  create(dto: CreateUserDto);
  verifyUser(email: string, password: string);
}
