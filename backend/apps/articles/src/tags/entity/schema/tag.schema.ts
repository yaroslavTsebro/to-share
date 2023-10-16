import { MongooseAbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class TagDocument extends MongooseAbstractDocument {
  @Prop({ required: true, unique: true })
  name: string;

  // @Prop({
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ArticleDocument' }],
  // })
  // articles: ArticleDocument[];
}

export const TagSchema = SchemaFactory.createForClass(TagDocument);
