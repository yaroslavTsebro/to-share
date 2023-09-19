import {
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IUsersService } from './users-service.interface';
import { CreateUserDto } from '../entity/dto/create-user.dto';
import User, { UserRole } from '../entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from '../repository/users.repository';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(UsersRepository) private readonly usersRepository: UsersRepository,
  ) {}

  async delete(id: number): Promise<void> {
    return await this.usersRepository.findOneAndDelete({ id });
  }

  async changeUsername(id: number, username: string): Promise<User> {
    return await this.usersRepository.findOneAndUpdate({ id }, { username });
  }

  async getById(id: number): Promise<User> {
    return this.usersRepository.findOneOrThrow({ id });
  }

  async verifyUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOneOrThrow({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) throw new UnauthorizedException('Wrong password');

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.validateCreateUserDto(createUserDto);
    const user = new User({
      ...createUserDto,
      role: UserRole.USER,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
    return this.usersRepository.create(user);
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOneOrThrow([
        { username: createUserDto.username },
        { email: createUserDto.email },
      ]);
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('Email or username already exists.');
  }
}
