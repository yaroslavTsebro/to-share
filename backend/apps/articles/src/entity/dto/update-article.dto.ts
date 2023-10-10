import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import { IsArray } from 'class-validator';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @IsArray()
  deletedFileIds: number[];
}
