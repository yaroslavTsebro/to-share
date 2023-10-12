import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { TagRepository } from './repository/tag.repository';
import { TagDocument, TagSchema } from './entity/schema/tag.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    LoggerModule,
    MongooseModule,
    MongooseModule.forFeature([{ name: TagDocument.name, schema: TagSchema }]),
  ],
  providers: [TagRepository],
  exports: [TagRepository],
})
export class TagsModule {}
