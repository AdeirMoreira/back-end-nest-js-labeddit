import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { handleExceptionFilter } from './handleException/handlerException.filter';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpException = exception instanceof HttpException;

    const httpStatus = httpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    exception = httpException
      ? exception
      : new handleExceptionFilter(exception).build();

    const responseBody = exception.getResponse();

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
