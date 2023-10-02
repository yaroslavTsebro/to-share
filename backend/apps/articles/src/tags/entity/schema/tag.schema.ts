import { MongooseAbstractDocument } from '@app/common';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { ArticleDocument } from 'apps/articles/src/entity/schema/article.schema';
import mongoose from 'mongoose';

export class TagDocument extends MongooseAbstractDocument {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: ArticleDocument.name }],
  })
  articles: ArticleDocument[];
}

export const TagSchema = SchemaFactory.createForClass(TagDocument);
