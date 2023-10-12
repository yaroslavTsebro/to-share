import { COMMENTS_SERVICE, CurrentUser, JwtAuthGuard, User } from '@app/common';
import { ICommentsService } from '../service/comments-service.interface';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateCommentDto } from '../entity/dto/update-comment.dto';
import { CreateCommentDto } from '../entity/dto/create-comment.dto';
import { PaginationCommentDto } from '../entity/dto/pagination-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(
    @Inject(COMMENTS_SERVICE)
    private readonly commentsService: ICommentsService,
  ) {}

  @Get(':articleId')
  async getComments(
    @Param('articleId') id: string,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 20,
  ): Promise<PaginationCommentDto> {
    return this.commentsService.getComments(id, page, perPage);
  }

  @Get('/replies/:id')
  async getReplies(
    @Param('id') id: number,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 20,
  ): Promise<PaginationCommentDto> {
    return this.commentsService.getReplies(id, page, perPage);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateById(
    @Param('id') id: number,
    @CurrentUser() user: User,
    @Body() dto: UpdateCommentDto,
  ): Promise<string> {
    return this.commentsService.updateById(id, user, dto);
  }

  @Post(':articleId')
  @UseGuards(JwtAuthGuard)
  async create(
    @Param('articleId') id: string,
    @CurrentUser() user: User,
    @Body() dto: CreateCommentDto,
  ): Promise<string> {
    return this.commentsService.create(id, user, dto);
  }
}
