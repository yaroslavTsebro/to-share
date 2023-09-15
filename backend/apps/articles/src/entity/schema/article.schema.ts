import { MongooseAbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Tag } from '../../tags/entity/schema/tag.schema';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article extends MongooseAbstractDocument {
  @Prop()
  creatorId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  titleImageIds: string[];

  @Prop()
  usersWhichLikedIds: string[];

  @Prop({ required: true })
  content: string;

  @Prop({ default: 0 })
  likesAmount: number;

  @Prop({ default: 0 })
  commentsAmount: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Tag.name }] })
  tags: Tag[];
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
