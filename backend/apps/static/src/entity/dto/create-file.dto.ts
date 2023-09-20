export class CreateArticleFileDto {
  articleId: string;
  files: Array<Express.Multer.File>;
}
