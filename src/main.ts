import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin === 'http://localhost:5173' ||
        origin === 'https://vita0609.github.io'
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['POST', 'GET'],
  });

  await app.listen(5000);
}
bootstrap();
