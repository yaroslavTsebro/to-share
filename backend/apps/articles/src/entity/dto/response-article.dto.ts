import { File } from '@app/common';
import { TagDocument } from '../../tags/entity/schema/tag.schema';
import { ArticleDocument } from '../schema/article.schema';

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
  tags: TagDocument[];

  static mapArticleToResponseArticle(
    article: ArticleDocument,
    titleImages: File[],
  ): ResponseArticleDto {
    const response = new ResponseArticleDto();
    response.id = article._id.toString();
    response.creatorId = article.creatorId;
    response.title = article.title;
    response.description = article.description;
    response.titleImages = titleImages;
    response.content = article.content;
    response.likesAmount = article.likesAmount;
    response.commentsAmount = article.commentsAmount;
    response.tags = article.tags;

    return response;
  }

  static mapArticlesToResponseArticles(
    articles: ArticleDocument[],
    titleImages: File[][],
  ): ResponseArticleDto[] {
    const response: ResponseArticleDto[] = [];
    for (let i = 0; i < articles.length; i++) {
      response[i] = this.mapArticleToResponseArticle(
        articles[i],
        titleImages[i],
      );
    }
    return response;
  }
}
