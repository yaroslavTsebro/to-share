import { Tag } from "../../tag/tag";
import { File } from "../../file/file";

export class ResponseArticleDto {
  id: string;
  creatorId: number;
  title: string;
  description: string;
  titleImages: File[];
  usersWhichLikedIds: number[];
  content: string;
  likesAmount: number;
  commentsAmount: number;
  tags: Tag[];
}
