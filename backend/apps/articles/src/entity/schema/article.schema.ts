import { MongooseAbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tag } from '../../tags/entity/schema/tag.schema';
import mongoose from 'mongoose';

@Schema()
export class ArticleDocument extends MongooseAbstractDocument {
  @Prop()
  creatorId: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  titleImageIds: number[];

  @Prop()
  usersWhichLikedIds: number[];

  @Prop({ required: true })
  content: string;

  @Prop({ default: 0 })
  likesAmount: number;

  @Prop({ default: 0 })
  commentsAmount: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Tag.name }] })
  tags: Tag[];
}

export const ArticleSchema = SchemaFactory.createForClass(ArticleDocument);
