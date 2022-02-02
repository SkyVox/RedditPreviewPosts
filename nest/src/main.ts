import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const options = {
    cors: true
  }
  
  const app = await NestFactory.create(AppModule, options);
  await app.listen(process.env.APPLICATION_PORT);
}
bootstrap();
