export enum FileType {
  FILE = "file",
  IMAGE = "image",
}

export class File {
  id: number;
  userId: number;
  articleId: string;
  name: string;
  type: FileType;
  createdAt: Date;
  updatedAt: Date;
}
