import { NestFactory } from '@nestjs/core';
import { CommentsModule } from './comments.module';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(CommentsModule);
  app.useLogger(app.get(Logger));
  await app.listen(3000);
}
bootstrap();
