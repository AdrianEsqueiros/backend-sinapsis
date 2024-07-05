import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let cachedServer;

export const handler = async (event, context) => {
  if (!cachedServer) {
    const nestApp = await NestFactory.create(AppModule);
  nestApp.setGlobalPrefix('api');

    nestApp.enableCors();

    nestApp.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      })
    );


      const config = new DocumentBuilder()
      .setTitle('Marketing Campaign API')
      .setDescription('API for managing marketing campaigns, customers, and users')
      .setVersion('1.0')
      .build();
    
    const document = SwaggerModule.createDocument(nestApp, config);
    SwaggerModule.setup('', nestApp, document);
    
    await nestApp.init();
    cachedServer = serverlessExpress({
      app: nestApp.getHttpAdapter().getInstance(),
    });
  }

  return cachedServer(event, context);
};
