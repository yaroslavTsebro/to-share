import { User } from '@app/common';
import { CreateArticleDto } from '../entity/dto/create-article.dto';
import { ResponseArticleDto } from '../entity/dto/response-article.dto';
import { PaginationArticleDto } from '../entity/dto/pagination-article.dto';

export const ARTICLE_SERVICE = Symbol('IArticlesService');

export interface IArticlesService {
  getById(id: string): Promise<ResponseArticleDto>;
  getTopArticlesPagination(
    page: number,
    perPage: number,
  ): Promise<PaginationArticleDto>;

  create(
    user: User,
    files: Array<Express.Multer.File>,
    dto: CreateArticleDto,
  ): Promise<ResponseArticleDto>;
}
