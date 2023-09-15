import { MongooseAbstractDocument } from '@app/common';
import { Prop } from '@nestjs/mongoose';
import { Article } from 'apps/articles/src/entity/schema/article.schema';
import mongoose from 'mongoose';

export class Tag extends MongooseAbstractDocument {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Article.name }] })
  articles: Article[];
}
