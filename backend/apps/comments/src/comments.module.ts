import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './service/comments.service';

@Module({
  imports: [],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
