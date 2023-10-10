import { SortQuery, User } from '@app/common';
import { CreateArticleDto } from '../entity/dto/create-article.dto';
import { ResponseArticleDto } from '../entity/dto/response-article.dto';
import { PaginationArticleDto } from '../entity/dto/pagination-article.dto';
import { UpdateArticleDto } from '../entity/dto/update-article.dto';
import { DeleteArticleDto } from '../entity/dto/delete-article.dto';

export const ARTICLE_SERVICE = Symbol('IArticlesService');

export interface IArticlesService {
  getById(id: string): Promise<ResponseArticleDto>;

  getByPagination(
    page: number,
    perPage: number,
    query?: string,
    tags?: string[],
    sortQuery?: SortQuery[],
  ): Promise<PaginationArticleDto>;

  deleteById(id: string): Promise<DeleteArticleDto>;

  updateById(
    id: string,
    user: User,
    files: Array<Express.Multer.File>,
    dto: UpdateArticleDto,
  ): Promise<ResponseArticleDto>;

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
