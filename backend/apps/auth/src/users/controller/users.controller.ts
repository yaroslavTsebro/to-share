import { Controller, Inject } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { USER_SERVICE } from '../service/users-service.interface';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USER_SERVICE) private readonly usersService: UsersService,
  ) {}
}
