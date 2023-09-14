import { NestFactory } from '@nestjs/core';
import { ArticlesModule } from './articles.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ArticlesModule);
  const configService = app.get(ConfigService);
  console.log(configService.get('PORT'));
  await app.listen(configService.get('PORT'));
}
bootstrap();
