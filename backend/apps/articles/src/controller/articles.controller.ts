import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseArrayPipe,
  Post,
  Put,
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
  SortQuery,
  SortValidationPipe,
  User,
} from '@app/common';
import { CreateArticleDto } from '../entity/dto/create-article.dto';
import { ResponseArticleDto } from '../entity/dto/response-article.dto';
import { PaginationArticleDto } from '../entity/dto/pagination-article.dto';
import { sortTypeKeys } from '../entity/dto/sort-by-article.type';
import { UpdateArticleDto } from '../entity/dto/update-article.dto';
import { DeleteArticleDto } from '../entity/dto/delete-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(
    @Inject(ARTICLE_SERVICE) private readonly articlesService: IArticlesService,
  ) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ResponseArticleDto> {
    return this.articlesService.getById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async updateById(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: UpdateArticleDto,
  ): Promise<ResponseArticleDto> {
    return this.articlesService.updateById(id, user, files, dto);
  }

  @Delete()
  async deleteById(@Param('id') id: string): Promise<DeleteArticleDto> {
    return this.articlesService.deleteById(id);
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
    @Query('sortby', new SortValidationPipe(sortTypeKeys))
    sortQuery?: SortQuery[],
  ): Promise<PaginationArticleDto> {
    return this.articlesService.getByPagination(
      page,
      perPage,
      query,
      tags,
      sortQuery,
    );
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
