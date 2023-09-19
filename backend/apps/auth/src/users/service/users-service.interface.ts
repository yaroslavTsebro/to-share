import { CreateUserDto } from '../entity/dto/create-user.dto';
import User from '../entity/user.entity';

export const USER_SERVICE = Symbol('IUserService');

export interface IUsersService {
  create(dto: CreateUserDto): Promise<User>;
  verifyUser(email: string, password: string): Promise<User>;
  getById(id: number): Promise<User>;
  changeUsername(id: number, username: string): Promise<User>;
  delete(id: number): Promise<void>;
}
