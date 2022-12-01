import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:{origin:["http://localhost:3001"]}});
  app.useGlobalPipes(new ValidationPipe({ enableDebugMessages: true }));
  await app.listen(3000);
}
bootstrap();
