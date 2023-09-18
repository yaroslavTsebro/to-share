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
  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) throw new UnauthorizedException('Wrong password');

    return user;
  }

  async create(createUserDto: CreateUserDto) {
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
      await this.usersRepository.findOne([
        { username: createUserDto.username },
        { email: createUserDto.email },
      ]);
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('Email or username already exists.');
  }
}
