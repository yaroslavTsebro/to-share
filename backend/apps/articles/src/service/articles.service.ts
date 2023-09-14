import { Injectable } from '@nestjs/common';
import { IArticlesService } from './articles-service.interface';

@Injectable()
export class ArticlesService implements IArticlesService {
  getHello(): string {
    return 'Hello World! from article';
  }
}
