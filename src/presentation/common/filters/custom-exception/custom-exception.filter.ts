import CustomError from '@/domain/errors/custom.error';
import DuplicatedError from '@/domain/errors/duplicated.error';
import InvalidCredentialsError from '@/domain/errors/invalid-credentials.error';
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch(CustomError)
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('CustomExceptionFilter');

  catch(exception: CustomError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(`CustomExceptionFilter: ${exception.message}`);

    switch (exception.name) {
      case CustomError.name:
        response.status(400).json({
          statusCode: 400,
          message: exception.message,
          error: 'Bad Request',
        });
        break;
      case DuplicatedError.name:
        response.status(409).json({
          statusCode: 409,
          message: exception.message,
          error: 'Conflict',
        });
        break;
      case InvalidCredentialsError.name:
        response.status(401).json({
          statusCode: 401,
          message: exception.message,
          error: 'Unauthorized',
        });
        break;
      default:
        this.logger.error(exception.stack);
        response.status(500).json({
          statusCode: 500,
          message: 'Internal Server Error',
          error: 'Internal Server Error',
        });
        break;
    }
  }
}
