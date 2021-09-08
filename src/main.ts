import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // This will remove any extra properties in the request that is not included in the dto
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
