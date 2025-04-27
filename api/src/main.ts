import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors();

  // Agregar prefijo global para la API
  app.setGlobalPrefix('api');

  // Puerto de la aplicación
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: http://localhost:${port}/api`);
}
bootstrap();
