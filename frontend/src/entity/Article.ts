import { Tag } from "./Tag";
import { File } from "./File";

export class Article{
  _id: string;
  title: string;
  content: string;
  images: File[];
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
}

