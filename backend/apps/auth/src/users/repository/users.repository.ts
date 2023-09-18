import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import User from '../entity/user.entity';
import { TypeOrmAbstractRepository } from '@app/common';

@Injectable()
export class UsersRepository extends TypeOrmAbstractRepository<User> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectRepository(User)
    usersRepository: Repository<User>,
    entityManager: EntityManager,
  ) {
    super(usersRepository, entityManager);
  }
}
