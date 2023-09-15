import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from '../entity/dto/create-user.dto';
import {
  IUsersService,
  USER_SERVICE,
} from '../service/users-service.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUsersService,
  ) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
