import { NestFactory } from '@nestjs/core';
import { StaticModule } from './static.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(StaticModule);
  const configService = app.get(ConfigService);
  app.useLogger(app.get(Logger));
  console.log(configService.get('PORT'));
  await app.listen(configService.get('PORT'));
}
bootstrap();
