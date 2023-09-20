import { Injectable } from '@nestjs/common';
import { IArticlesService } from './articles-service.interface';
import { CreateArticleDto } from '../entity/dto/create-article.dto';
import { ArticleDocument } from '../entity/schema/article.schema';
import { ArticlesRepository } from '../repository/articles.repository';
import { User } from '@app/common';

@Injectable()
export class ArticlesService implements IArticlesService {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  async getById(id: string): Promise<ArticleDocument> {
    return this.articlesRepository.findOne({ _id: id });
  }

  async create(user: User, files: Express.Multer.File[], dto: CreateArticleDto): Promise<ArticleDocument> {
    throw new Error('Method not implemented.');
  }
}
  