import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

import env from '@/config/environment';
import { swaggerConfig } from '@/config/docs/swagger';
import { AppModule } from '@/presentation/app.module';
import { CustomExceptionFilter } from '@/presentation/common/filters/custom-exception/custom-exception.filter';

async function bootstrap() {
  // Create a logger instance for the server
  const logger = new Logger('Server');

  // Create the NestJS application
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    // Use global pipes for validation (ignores unknown properties)
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new CustomExceptionFilter());

  // Sets /api as the global prefix for all routes
  app.setGlobalPrefix('api');
  app.enableCors({
    // Enable CORS with specified origins and methods
    origin: env.API_ALLOWED_ORIGINS,
    methods: env.API_ALLOWED_METHODS,
    allowedHeaders: 'Content-Type, Accept',
  });
  logger.debug(`CORS enabled for origins: ${env.API_ALLOWED_ORIGINS}`);
  logger.debug(`CORS allowed methods: ${env.API_ALLOWED_METHODS}`);

  const config = new DocumentBuilder() // Configure Swagger documentation
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Set up Swagger at /api/docs

  logger.log(`API is running on port ${env.API_PORT}`);
  logger.log(`Swagger is available at /api/docs`);

  await app.listen(env.API_PORT); // Start the application and listen on the specified port
}

export default bootstrap;
