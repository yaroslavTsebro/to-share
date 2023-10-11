import { Module } from '@nestjs/common';
import { CommentsService } from './service/comments.service';
import { COMMENTS_SERVICE } from '@app/common';
import { CommentRepository } from './repository/comment.repository';

@Module({
  imports: [],
  // controllers: [CommentsController],

  providers: [
    CommentRepository,
    {
      useClass: CommentsService,
      provide: COMMENTS_SERVICE,
    },
  ],
})
export class CommentsModule {}
