import { Inject, Injectable } from '@nestjs/common';
import { IArticlesService } from './articles-service.interface';
import { CreateArticleDto } from '../entity/dto/create-article.dto';
import { ArticleDocument } from '../entity/schema/article.schema';
import { ArticlesRepository } from '../repository/articles.repository';
import {
  CreateArticleFileDto,
  File,
  GET_ARTICLES_TITLES,
  GET_ARTICLE_TITLES,
  SAVE_ARTICLE_TITLE,
  STATIC_SERVICE,
  User,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { TagRepository } from '../tags/repository/tag.repository';
import { ResponseArticleDto } from '../entity/dto/response-article.dto';
import { PaginationArticleDto } from '../entity/dto/pagination-article.dto';

@Injectable()
export class ArticlesService implements IArticlesService {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    private readonly tagRepository: TagRepository,
    @Inject(STATIC_SERVICE) private readonly staticService: ClientProxy,
  ) {}

  async getById(id: string): Promise<ResponseArticleDto> {
    const articleFiles = await this.staticService
      .send<File[]>(GET_ARTICLE_TITLES, id)
      .toPromise();

    const article = await this.articlesRepository.findOne(
      { _id: id },
      { populate: 'tags' },
    );

    return ResponseArticleDto.mapArticleToResponseArticle(
      article,
      articleFiles,
    );
  }

  async fetchArticlesFiles(ids: string[]): Promise<File[][]> {
    return await this.staticService
      .send<File[][]>(GET_ARTICLES_TITLES, ids)
      .toPromise();
  }

  async getTopArticlesPagination(
    page: number,
    perPage: number,
  ): Promise<PaginationArticleDto> {
    const articles = await this.articlesRepository.find(
      {},
      {
        limit: perPage,
        skip: (page - 1) * perPage,
        sort: { likesAmount: -1, commentsAmount: -1 },
      },
    );
    const articlesFiles = await this.fetchArticlesFiles(
      articles.map((article) => article._id.toString()),
    );

    const count = await this.articlesRepository.getCount({});

    const formatedArticles = ResponseArticleDto.mapArticlesToResponseArticles(
      articles,
      articlesFiles,
    );
    return new PaginationArticleDto(formatedArticles, count, page, perPage);
  }

  async create(
    user: User,
    files: Express.Multer.File[],
    dto: CreateArticleDto,
  ): Promise<ResponseArticleDto> {
    const toCreate = new ArticleDocument();
    toCreate.creatorId = user.id;
    toCreate.title = dto.title;
    toCreate.description = dto.description;
    toCreate.content = dto.content;

    await this.tagRepository.createOrIgnore(dto.tags);
    const tags = await this.tagRepository.find({ name: { $in: dto.tags } });
    toCreate.tags = tags;

    const article = await this.articlesRepository.create(toCreate);

    const fileDto = new CreateArticleFileDto();
    fileDto.articleId = article._id.toString();
    fileDto.files = files;
    const insertedFiles = await this.staticService
      .send<File[]>(SAVE_ARTICLE_TITLE, fileDto)
      .toPromise();

    const updated = await this.articlesRepository.findOneAndUpdate(
      { _id: article._id },
      { titleImageIds: insertedFiles.map((e) => e.id) },
    );
    return ResponseArticleDto.mapArticleToResponseArticle(
      updated,
      insertedFiles,
    );
  }
}
