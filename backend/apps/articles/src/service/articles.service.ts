import { Injectable } from '@nestjs/common';
import { IArticlesService } from './articles-service.interface';
import { CreateArticleDto } from '../entity/dto/create-article.dto';

@Injectable()
export class ArticlesService implements IArticlesService {
  create(dto: CreateArticleDto, images: Express.Multer.File[], userId: string): string {
    throw new Error('Method not implemented.');
  }
  getHello(): string {
    return 'Hello World! from article';
  }
}
