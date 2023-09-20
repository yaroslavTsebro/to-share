import { User } from '@app/common';
import { CreateArticleDto } from '../entity/dto/create-article.dto';
import { ArticleDocument } from '../entity/schema/article.schema';

export const ARTICLE_SERVICE = Symbol('IArticlesService');

export interface IArticlesService {
  getById(id: string): Promise<ArticleDocument>;

  create(
    user: User,
    files: Array<Express.Multer.File>,
    dto: CreateArticleDto,
  ): Promise<ArticleDocument>;
}
