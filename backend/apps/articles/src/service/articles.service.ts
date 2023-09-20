import { Inject, Injectable } from '@nestjs/common';
import { IArticlesService } from './articles-service.interface';
import { CreateArticleDto } from '../entity/dto/create-article.dto';
import { ArticleDocument } from '../entity/schema/article.schema';
import { ArticlesRepository } from '../repository/articles.repository';
import {
  CreateArticleFileDto,
  SAVE_ARTICLE_TITLE,
  STATIC_SERVICE,
  User,
} from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ArticlesService implements IArticlesService {
  constructor(
    private readonly articlesRepository: ArticlesRepository,
    @Inject(STATIC_SERVICE) private readonly staticService: ClientProxy,
  ) {}

  async getById(id: string): Promise<ArticleDocument> {
    return this.articlesRepository.findOne({ _id: id });
  }

  async create(
    user: User,
    files: Express.Multer.File[],
    dto: CreateArticleDto,
  ): Promise<ArticleDocument> {
    const toCreate = new ArticleDocument();
    toCreate.creatorId = user.id;
    toCreate.title = dto.title;
    toCreate.content = dto.content;
    const article = await this.articlesRepository.create(toCreate);

    const fileDto = new CreateArticleFileDto();
    fileDto.articleId = article._id.toString();
    fileDto.files = files;
    this.staticService
      .send(SAVE_ARTICLE_TITLE, fileDto)
      .pipe<string[]>((res) => {
        return this.articlesRepository.findOneAndUpdate(
          { _id: article._id },
          { titleImageIds: res },
        );
      });
  }
}
