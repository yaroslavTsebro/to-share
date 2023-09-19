import { Module } from '@nestjs/common';
import { TokenService } from './service/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Token from './entity/token.entity';
import { TOKEN_SERVICE } from './service/token-service.interface';
import { TokenRepository } from './repository/token.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Token]), TypeOrmModule],
  providers: [
    {
      provide: TOKEN_SERVICE,
      useClass: TokenService,
    },
    TokenRepository,
  ],
  exports: [
    {
      provide: TOKEN_SERVICE,
      useClass: TokenService,
    },
  ],
})
export class TokenModule {}
