import { IsString, Length } from 'class-validator';

export class CreateArticleDto {
  @Length(10, 60)
  @IsString()
  title: string;

  @Length(10, 60)
  @IsString()
  content: string;
}
