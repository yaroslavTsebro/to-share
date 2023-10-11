import { Injectable } from '@nestjs/common';
import { ICommentsService } from './comments-service.interface';
import { User } from '@app/common';
import { CreateCommentDto } from '../entity/dto/create-comment.dto';
import { UpdateCommentDto } from '../entity/dto/update-comment.dto';

@Injectable()
export class CommentsService implements ICommentsService {
  
  async getComments(id: string, page: number, perPage: number) {
    throw new Error('Method not implemented.');
  }
  async getReplies(id: number, page: number, perPage: number) {
    throw new Error('Method not implemented.');
  }
  async updateById(id: string, user: User, dto: UpdateCommentDto) {
    throw new Error('Method not implemented.');
  }
  async create(id: string, user: User, dto: CreateCommentDto) {
    throw new Error('Method not implemented.');
  }
}
