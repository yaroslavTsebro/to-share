import { CreateArticleDto } from '../entity/dto/create-article.dto';

export const ARTICLE_SERVICE = Symbol('IArticlesService');

export interface IArticlesService {
  getHello(): string;

  create(
    dto: CreateArticleDto,
    images: Express.Multer.File[],
    userId: string,
  ): string;
}
