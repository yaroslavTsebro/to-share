import { BaseEntity } from '@app/common';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Comment extends BaseEntity<File> {
  @Index('user-id-comment')
  @Column()
  userId: number;

  @Index('article-id-comment')
  @Column()
  articleId: string;

  @Column()
  text: string;

  @ManyToOne((type) => Comment, (comment) => comment.replies, {
    nullable: true,
  })
  parentComment: Comment;

  @OneToMany((type) => Comment, (comment) => comment.parentComment)
  replies: Comment[];

  @ManyToOne((type) => Comment, (comment) => comment.rootReplies, {
    nullable: true,
  })
  rootComment: Comment;

  @OneToMany((type) => Comment, (comment) => comment.rootComment)
  rootReplies: Comment[];

  @Column({ default: 0 })
  numberOfReplies: number;
}
