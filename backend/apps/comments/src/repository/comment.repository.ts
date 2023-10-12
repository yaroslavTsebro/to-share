import { TypeOrmAbstractRepository } from '@app/common';
import { BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, QueryRunner, Repository } from 'typeorm';
import { Comment } from '../entity/comment.entity';

export class CommentRepository extends TypeOrmAbstractRepository<Comment> {
  protected logger: Logger = new Logger(CommentRepository.name);

  constructor(
    @InjectRepository(Comment)
    public commentRepository: Repository<Comment>,
    entityManager: EntityManager,
  ) {
    super(commentRepository, entityManager);
  }

  async getCommentsPaginationWithoutRepliesByArticleId(
    page: number,
    perPage: number,
    articleId: string,
  ): Promise<Comment[]> {
    return this.commentRepository.find({
      where: {
        articleId: articleId,
        rootComment: null,
      },
      skip: (page - 1) * perPage,
      take: perPage,
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async getCount(articleId: string): Promise<number> {
    return this.commentRepository.count({ where: { articleId: articleId } });
  }

  async getRepliesPaginationByRootId(
    page: number,
    perPage: number,
    rootId: number,
  ): Promise<Comment[]> {
    return this.commentRepository.find({
      where: {
        rootComment: { id: rootId },
      },
      skip: (page - 1) * perPage,
      take: perPage,
      order: {
        createdAt: 'ASC',
      },
    });
  }

  async deleteCommentById(id: number, userId: number): Promise<number | null> {
    const queryRunner: QueryRunner = this.entityManager.queryRunner;

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const comment = await this.commentRepository.findOne({
        where: { id: id, userId: userId },
      });

      if (!comment) {
        throw new BadRequestException('Wrong comment id ');
      }

      if (comment.rootComment) {
        await queryRunner.manager.decrement(
          Comment,
          {
            id: comment.rootComment.id,
          },
          'numberOfReplies',
          1,
        );
      }

      const result = await queryRunner.manager.delete(Comment, { id: id });
      await queryRunner.commitTransaction();
      return result.affected;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async createRootComment(
    articleId: string,
    userId: number,
    text: string,
  ): Promise<Comment> {
    return this.commentRepository.create({
      articleId: articleId,
      userId: userId,
      text: text,
    });
  }

  async createReply(
    articleId: string,
    userId: number,
    text: string,
    rootId: number,
    parentId: number,
  ): Promise<Comment> {
    const queryRunner: QueryRunner = this.entityManager.queryRunner;

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const rootComment = await this.commentRepository.findOne({
        where: { id: rootId },
      });

      if (!rootComment) {
        throw new BadRequestException('Wrong root comment');
      }

      rootComment.numberOfReplies += 1;
      await queryRunner.manager.save(rootComment);

      const newReply = this.commentRepository.create({
        articleId: articleId,
        userId: userId,
        text: text,
        rootComment: { id: rootId },
        parentComment: { id: parentId },
      });

      const result = await queryRunner.manager.save(newReply);
      await queryRunner.commitTransaction();

      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async updateComment(
    userId: number,
    id: number,
    text: string,
  ): Promise<Comment> {
    const result = await this.commentRepository.update(
      { userId: userId, id: id },
      { text: text },
    );
    if (!result.affected || result.affected == 0) {
      throw new BadRequestException('Wrong data');
    }
    return await this.commentRepository.findOne({ where: { id: id } });
  }
}
