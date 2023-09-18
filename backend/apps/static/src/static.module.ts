import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as Joi from 'joi';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './apps/static/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
  ],
})
export class StaticModule {}
