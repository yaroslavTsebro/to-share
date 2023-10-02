import { Module } from '@nestjs/common';
import { ArticlesService } from './service/articles.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ArticlesController } from './controller/articles.controller';
import { ARTICLE_SERVICE } from './service/articles-service.interface';
import { TagsModule } from './tags/tags.module';
import { LoggerModule } from '@app/common';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: './apps/articles/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
    }),
    TagsModule,
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
