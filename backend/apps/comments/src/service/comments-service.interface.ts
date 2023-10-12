import { User } from '@app/common';
import { UpdateCommentDto } from '../entity/dto/update-comment.dto';
import { CreateCommentDto } from '../entity/dto/create-comment.dto';

export const COMMENTS_SERVICE = Symbol('CommentsService');

export interface ICommentsService {
  getComments(articleId: string, page: number, perPage: number);
  getReplies(id: number, page: number, perPage: number);
  updateById(id: number, user: User, dto: UpdateCommentDto);
  create(articleId: string, user: User, dto: CreateCommentDto);
  delete(id: number, user: User);
}
