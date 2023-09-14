import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article extends AbstractDocument {
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
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
