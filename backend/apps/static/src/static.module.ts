import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { join } from 'path';
import { File } from './entity/file.entity';
import { StaticService } from './service/static.service';
import { STATIC_SERVICE } from './service/static-service.interface';
import { StaticController } from './controller/static.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    TypeOrmModule,
    ConfigModule.forRoot({
      envFilePath: './apps/static/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static',
    }),
  ],
  providers: [
    {
      useClass: StaticService,
      provide: STATIC_SERVICE,
    },
  ],
  controllers: [StaticController],
})
export class StaticModule {}
