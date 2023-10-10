import { ArticleDocument } from '../schema/article.schema';

export class DeleteArticleDto {
  title: string;
  filesDeleted: number;
  likesAmount: number;
  commentsAmount: number;
  published: Date;
  deleted: Date;

  static mapArticleToDto(
    article: ArticleDocument,
    deleted: Date,
    filesDeletedAmount: number,
  ): DeleteArticleDto {
    const result = new DeleteArticleDto();
    result.likesAmount = article.likesAmount;
    result.commentsAmount = article.commentsAmount;
    result.title = article.title;
    result.published = article.createdAt;
    result.deleted = deleted;
    result.filesDeleted = filesDeletedAmount;
    return result;
  }
}
