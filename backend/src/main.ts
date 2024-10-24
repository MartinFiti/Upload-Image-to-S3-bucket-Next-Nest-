import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.API_PREFIX ?? 'api');
  app.use(json({ limit: '5mb' }));
  await app.listen(process.env.PORT ?? 9000);
}
bootstrap();
