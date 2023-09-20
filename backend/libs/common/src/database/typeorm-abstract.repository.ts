import { Logger, NotFoundException } from '@nestjs/common';
import { BaseEntity } from './typeorm-base.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import {
  EntityManager,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

export abstract class TypeOrmAbstractRepository<T extends BaseEntity<T>> {
  protected abstract readonly logger: Logger;

  constructor(
    private readonly itemsRepository: Repository<T>,
    public readonly entityManager: EntityManager,
  ) {}

  async create(entity: T): Promise<T> {
    return this.entityManager.save(entity);
  }

  async findOneOrThrow(
    where: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T> {
    const entity = await this.itemsRepository.findOne({ where, relations });

    if (!entity) {
      this.logger.warn('Document not found with where', where);
      throw new NotFoundException('Entity not found.');
    }

    return entity;
  }

  async findOne(
    where: FindOptionsWhere<T>[] | FindOptionsWhere<T>,
    relations?: FindOptionsRelations<T>,
  ): Promise<T | null> {
    return await this.itemsRepository.findOne({ where, relations });
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ) {
    const updateResult = await this.itemsRepository.update(
      where,
      partialEntity,
    );

    if (!updateResult.affected) {
      this.logger.warn('Entity not found with where', where);
      throw new NotFoundException('Entity not found.');
    }

    return this.findOneOrThrow(where);
  }

  async find(where: FindOptionsWhere<T>) {
    return this.itemsRepository.findBy(where);
  }

  async findOneAndDelete(where: FindOptionsWhere<T>) {
    const amount = await this.itemsRepository.delete(where);
    if (!amount.affected) {
      this.logger.warn('Entity was not deleted with where', where);
      throw new NotFoundException('Entity was not deleted.');
    }
  }
}
