import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entity/user.entity';
import { UsersService } from './service/users.service';
import { USER_SERVICE } from './service/users-service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      useClass: UsersService,
      provide: USER_SERVICE,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
