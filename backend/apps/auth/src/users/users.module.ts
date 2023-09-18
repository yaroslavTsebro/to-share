import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { USER_SERVICE } from './service/users-service.interface';
import { UsersRepository } from './repository/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule],
  providers: [
    {
      useClass: UsersService,
      provide: USER_SERVICE,
    },
    UsersRepository,
  ],
  controllers: [UsersController],
  exports: [
    {
      useClass: UsersService,
      provide: USER_SERVICE,
    },
  ],
})
export class UsersModule {}
