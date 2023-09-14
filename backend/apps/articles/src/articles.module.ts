import { Module } from '@nestjs/common';
import { ArticlesService } from './service/articles.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ArticlesController } from './controller/articles.controller';
import { ARTICLE_SERVICE } from './service/articles-service.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/articles/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
      }),
    }),
  ],
  controllers: [ArticlesController],
  providers: [
    {
      useClass: ArticlesService,
      provide: ARTICLE_SERVICE,
    },
  ],
})
export class ArticlesModule {}
