import { Controller, Get, Inject } from '@nestjs/common';

import {
  ARTICLE_SERVICE,
  IArticlesService,
} from '../service/articles-service.interface';

@Controller('articles')
export class ArticlesController {
  constructor(
    @Inject(ARTICLE_SERVICE) private readonly articlesService: IArticlesService,
  ) {}

  @Get()
  getHello(): string {
    return this.articlesService.getHello();
  }
}
