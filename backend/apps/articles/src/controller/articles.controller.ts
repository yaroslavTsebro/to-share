import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ARTICLE_SERVICE,
  IArticlesService,
} from '../service/articles-service.interface';
import { ArticleDocument } from '../entity/schema/article.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CurrentUser, JwtAuthGuard, User } from '@app/common';
import { CreateArticleDto } from '../entity/dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(
    @Inject(ARTICLE_SERVICE) private readonly articlesService: IArticlesService,
  ) {}

  @Get()
  async getById(id: string): Promise<ArticleDocument> {
    return this.articlesService.getById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @CurrentUser() user: User,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: CreateArticleDto,
  ) {
    this.articlesService.create(user, files, dto);
  }
}
