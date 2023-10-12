import { UserCommentDto } from '@app/common';
import { Comment } from '../comment.entity';

export class ResponseCommentDto {
  id: number;
  text: string;
  parentComment: number;
  rootComment: number;
  createdAt: Date;
  updatedAt: Date;
  user: UserCommentDto;

  static mapDataToDto(
    comment: Comment,
    user: UserCommentDto,
  ): ResponseCommentDto {
    const dto = new ResponseCommentDto();
    dto.id = comment.id;
    dto.text = comment.text;
    dto.rootComment = comment.rootComment.id;
    dto.parentComment = comment.parentComment.id;
    dto.updatedAt = comment.updatedAt;
    dto.createdAt = comment.createdAt;
    dto.user = user;
    return dto;
  }
}
