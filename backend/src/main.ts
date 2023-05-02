import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('MM Chat')
    .setDescription('MM Chat API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const path = 'api';
  SwaggerModule.setup(path, app, document);

  const PORT = process.env.PORT ?? 4000;
  await app.listen(PORT, () =>
    console.log(`[MM CHAT] RUNNING ON PORT ${PORT}`),
  );
}
bootstrap();
