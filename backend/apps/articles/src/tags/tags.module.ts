import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { TagRepository } from './repository/tag.repository';
import { TagDocument, TagSchema } from './entity/schema/tag.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TAG_SERVICE } from './service/tag-service.interface';
import { TagService } from './service/tag.service';
import { TagController } from './controller/tags.controller';

@Module({
  imports: [
    LoggerModule,
    MongooseModule,
    MongooseModule.forFeature([{ name: TagDocument.name, schema: TagSchema }]),
  ],
  controllers: [TagController],
  providers: [
    TagRepository,
    {
      useClass: TagService,
      provide: TAG_SERVICE,
    },
  ],
  exports: [TagRepository],
})
export class TagsModule {}
