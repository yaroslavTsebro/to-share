import { NestFactory } from '@nestjs/core';
import { StaticModule } from './static.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(StaticModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('KAFKA_URI')],
      queue: 'static',
    },
  });
  app.useLogger(app.get(Logger));
  console.log(configService.get('PORT'));
  await app.listen(configService.get('PORT'));
}
bootstrap();
