import { TypeOrmAbstractRepository } from '@app/common';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Comment } from '../entity/comment.entity';

export class CommentRepository extends TypeOrmAbstractRepository<Comment> {
  protected logger: Logger = new Logger(CommentRepository.name);

  constructor(
    @InjectRepository(Comment)
    commentRepository: Repository<Comment>,
    entityManager: EntityManager,
  ) {
    super(commentRepository, entityManager);
  }
}
