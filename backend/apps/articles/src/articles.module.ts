import { Module } from '@nestjs/common';
import { ArticlesService } from './service/articles.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ArticlesController } from './controller/articles.controller';
import { ARTICLE_SERVICE } from './service/articles-service.interface';
import { TagsModule } from './tags/tags.module';
import { AUTH_SERVICE, LoggerModule, STATIC_SERVICE } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleDocument, ArticleSchema } from './entity/schema/article.schema';
import { ArticlesRepository } from './repository/articles.repository';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: ArticleDocument.name, schema: ArticleSchema },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: './apps/articles/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
    }),
    TagsModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'auth',
          },
        }),
        inject: [ConfigService],
      },
      {
        name: STATIC_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'static',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ArticlesController],
  providers: [
    ArticlesRepository,
    {
      useClass: ArticlesService,
      provide: ARTICLE_SERVICE,
    },
  ],
  exports: [ArticlesRepository],
})
export class ArticlesModule {}
