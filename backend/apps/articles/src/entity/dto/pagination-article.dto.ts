import { ResponseArticleDto } from './response-article.dto';

export class PaginationArticleDto {
  articles: ResponseArticleDto[];
  count: number;
  page: number;
  perPage: number;

  constructor(
    articles: ResponseArticleDto[],
    count: number,
    page: number,
    perPage: number,
  ) {
    this.articles = articles;
    this.count = count;
    this.perPage = perPage;
    this.page = page;
  }
}
