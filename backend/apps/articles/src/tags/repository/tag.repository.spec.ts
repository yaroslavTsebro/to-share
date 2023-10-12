import { MongooseAbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArticleDocument } from '../../entity/schema/article.schema';

@Injectable()
export class ArticlesRepository extends MongooseAbstractRepository<ArticleDocument> {
  protected readonly logger = new Logger(ArticlesRepository.name);

  constructor(
    @InjectModel(ArticleDocument.name)
    reservationModel: Model<ArticleDocument>,
  ) {
    super(reservationModel);
  }
}
