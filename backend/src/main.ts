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

  const path = 'docs';
  SwaggerModule.setup(path, app, document);

  const PORT = process.env.PORT ?? 4000;
  const url = `http://localhost:${PORT}`;

  const BLUE_COLOR = `\x1b[34m`;
  const GREEN_COLOR = `\x1b[32m`;
  const WHITE_COLOR = `\x1b[97m`;
  const END_COLOR = '\x1b[0m';

  await app.listen(PORT, () => {
    console.log(
      `\n${BLUE_COLOR}[MM CHAT]${END_COLOR} RUNNING AT ${WHITE_COLOR}${url}/`,
    );
    console.log(
      `${GREEN_COLOR}[SWAGGER]${END_COLOR} RUNNING AT ${WHITE_COLOR}${url}/${path}`,
    );
  });
}

bootstrap();
