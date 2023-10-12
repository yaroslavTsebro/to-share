import mongoose from 'mongoose';
import { TagDocument } from '../../tags/entity/schema/tag.schema';
import { MongooseAbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ArticleDocument extends MongooseAbstractDocument {
  @Prop()
  creatorId: number;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

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

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TagDocument' }],
  })
  tags: TagDocument[];
}

export const ArticleSchema = SchemaFactory.createForClass(ArticleDocument);
