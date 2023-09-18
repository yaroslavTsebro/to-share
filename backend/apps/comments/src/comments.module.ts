import { Module } from '@nestjs/common';
import { CommentsService } from './service/comments.service';

@Module({
  imports: [],
  // controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
