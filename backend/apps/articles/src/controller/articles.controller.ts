import {
  Body,
  Controller,
  Get,
  Inject,
  ParseArrayPipe,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ARTICLE_SERVICE,
  IArticlesService,
} from '../service/articles-service.interface';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  CurrentUser,
  JwtAuthGuard,
  SortValidationPipe,
  User,
} from '@app/common';
import { CreateArticleDto } from '../entity/dto/create-article.dto';
import { ResponseArticleDto } from '../entity/dto/response-article.dto';
import { PaginationArticleDto } from '../entity/dto/pagination-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(
    @Inject(ARTICLE_SERVICE) private readonly articlesService: IArticlesService,
  ) {}

  @Get()
  async getById(id: string): Promise<ResponseArticleDto> {
    return this.articlesService.getById(id);
  }

  @Get('/top')
  async getTopByPagination(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 20,
  ): Promise<PaginationArticleDto> {
    return this.articlesService.getTopArticlesPagination(page, perPage);
  }

  @Get('')
  async getByPagination(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 20,
    @Query('query') query?: string,
    @Query('tags', new ParseArrayPipe({ items: Number, separator: ',' }))
    tags?: string[],
    @Query('sortby', SortValidationPipe) sortQuery?: SortQuery[],
  ): Promise<PaginationArticleDto> {
    return this.articlesService.getTopArticlesPagination(page, perPage);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @CurrentUser() user: User,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: CreateArticleDto,
  ): Promise<ResponseArticleDto> {
    return this.articlesService.create(user, files, dto);
  }
}
