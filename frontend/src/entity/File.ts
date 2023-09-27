export enum FileType {
  FILE = 'file',
  IMAGE = 'image',
}

export class File {
  id: string;
  userId: number;
  articleId: string;
  type: FileType;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
