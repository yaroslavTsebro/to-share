import { UpdateCommentDto } from './update-comment.dto';

export class CreateCommentDto extends UpdateCommentDto {
  parentId?: number;
  rootId?: number;
}
