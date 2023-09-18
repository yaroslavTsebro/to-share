import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../entity/dto/create-user.dto';
import { USER_SERVICE } from '../service/users-service.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_SERVICE) private readonly usersService: UsersService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
