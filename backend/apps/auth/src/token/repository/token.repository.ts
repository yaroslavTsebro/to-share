import { TypeOrmAbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import Token from '../entity/token.entity';

@Injectable()
export class TokenRepository extends TypeOrmAbstractRepository<Token> {
  protected readonly logger = new Logger(TokenRepository.name);

  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    entityManager: EntityManager,
  ) {
    super(tokenRepository, entityManager);
  }
}
