export class UpdateArticleDto{
  deletedFileIds: number[];
  title?: string;
  description?: string;
  content?: string;
  tags?: string[];
}
