import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';

const LISTEN_PORT = process.env.LISTEN_PORT ?? 3000;

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  app.use(helmet);

  app.enableCors({});

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true,
    }),
  );

  await app.listen(LISTEN_PORT).then(async () => {
    const url = await app.getUrl();
    Logger.log(`Listening on ${url}`, 'Main');
  });
}
bootstrap();
