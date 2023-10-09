import { LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { TagRepository } from './repository/tag.repository';

@Module({ imports: [LoggerModule], exports: [TagRepository] })
export class TagsModule {}
