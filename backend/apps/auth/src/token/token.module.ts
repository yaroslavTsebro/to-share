import { Module } from '@nestjs/common';
import { TokenService } from './service/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Token from './entity/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [TokenService],
})
export class TokenModule {}
