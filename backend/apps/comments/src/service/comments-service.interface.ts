import { User } from '@app/common';
import { UpdateCommentDto } from '../entity/dto/update-comment.dto';
import { CreateCommentDto } from '../entity/dto/create-comment.dto';

export const COMMENTS_SERVICE = Symbol('CommentsService');

export interface ICommentsService {
  getComments(id: string, page: number, perPage: number);
  getReplies(id: number, page: number, perPage: number);
  updateById(id: string, user: User, dto: UpdateCommentDto);
  create(id: string, user: User, dto: CreateCommentDto);
}
