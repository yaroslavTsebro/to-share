import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, QueryOptions, Types, UpdateQuery } from 'mongoose';
import { CreateIndexesOptions } from 'mongodb';
import { MongooseAbstractDocument } from './mongoose-abstract.schema';

export abstract class MongooseAbstractRepository<
  TDocument extends MongooseAbstractDocument,
> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument>;
  async findOne(
    filterQuery: FilterQuery<TDocument>,
    options: QueryOptions<TDocument>,
  ): Promise<TDocument>;
  async findOne(
    filterQuery: FilterQuery<TDocument>,
    options?: QueryOptions<TDocument>,
  ): Promise<TDocument> {
    let document;
    if (options) {
      document = await this.model.findOne(
        filterQuery,
        {},
        { ...options, lean: true },
      );
    } else {
      document = await this.model.findOne(filterQuery, {}, { lean: true });
    }

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document as TDocument;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument>;
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    options: QueryOptions<TDocument>,
  ): Promise<TDocument>;
  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    options?: QueryOptions<TDocument>,
  ): Promise<TDocument> {
    let document;

    if (options) {
      document = await this.model.findOneAndUpdate(filterQuery, update, {
        ...options,
        lean: true,
        new: true,
      });
    } else {
      document = await this.model.findOneAndUpdate(filterQuery, update, {
        lean: true,
        new: true,
      });
    }

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document as TDocument;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]>;
  async find(
    filterQuery: FilterQuery<TDocument>,
    options: QueryOptions<TDocument>,
  ): Promise<TDocument[]>;
  async find(
    filterQuery: FilterQuery<TDocument>,
    options?: QueryOptions<TDocument>,
  ): Promise<TDocument[]> {
    let documents;

    if (options) {
      documents = await this.model.find(
        filterQuery,
        {},
        { ...options, lean: true },
      );
    } else {
      documents = await this.model.find(filterQuery, {}, { lean: true });
    }
    return documents as TDocument[];
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }

  async getCount(filterQuery: FilterQuery<TDocument>): Promise<number>;
  async getCount(
    filterQuery: FilterQuery<TDocument>,
    options: QueryOptions<TDocument>,
  ): Promise<number>;
  async getCount(
    filterQuery: FilterQuery<TDocument>,
    options?: QueryOptions<TDocument>,
  ): Promise<number> {
    if (options) {
      return this.model.countDocuments(filterQuery, options);
    } else {
      return this.model.countDocuments(filterQuery);
    }
  }

  async createIndex(options: CreateIndexesOptions) {
    return this.model.createIndexes(options as any);
  }
}
