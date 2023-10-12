import { MongooseAbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ArticleDocument } from '../entity/schema/article.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ArticlesRepository extends MongooseAbstractRepository<ArticleDocument> {
  protected readonly logger = new Logger(ArticlesRepository.name);

  constructor(
    @InjectModel(ArticleDocument.name)
    private readonly articlesModel: Model<ArticleDocument>,
  ) {
    super(articlesModel);
  }
}
