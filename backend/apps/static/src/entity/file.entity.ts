import { BaseEntity } from '@app/common';
import { Column, Entity, Index } from 'typeorm';

export enum FileType {
  FILE = 'file',
  IMAGE = 'image',
}

@Entity()
export class File extends BaseEntity<File> {
  @Index('user-id')
  @Column()
  userId: number;

  @Index('article-id')
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
