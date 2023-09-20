import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../database';

export enum FileType {
  FILE = 'file',
  IMAGE = 'image',
}

@Entity()
export class File extends BaseEntity<File> {
  @Column()
  userId: number;

  @Column()
  articleId: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: FileType,
    default: FileType.IMAGE.toString(),
  })
  type: FileType;
}
