import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { typeORMHandler } from './typeORMError/typeORM.handler';

interface typeORMErrorDetails {
  errno?: number;
}

export class handleExceptionFilter {
  constructor(private exception: any) {
    this.handleError();
  }
  messageError = '';

  handleError() {
    if (this.exception instanceof TypeORMError) {
      this.typeORMHandlerError(this.exception);
    } else {
      return new InternalServerErrorException('Erro desconhecido.');
    }
  }

  typeORMHandlerError(exception: TypeORMError & typeORMErrorDetails) {
    this.messageError = typeORMHandler(exception.errno, exception.message);
  }

  build() {
    return new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: this.messageError,
        error: this.messageError,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
