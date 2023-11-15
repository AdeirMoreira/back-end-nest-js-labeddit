import { HttpException, HttpStatus } from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { typeORMHandler } from './typeORMError/typeORM.handler';

interface typeORMErrorDetails {
  errno?: number;
}

export class handleExceptionFilter {
  constructor(private exception: any) {
    this.handlerError();
  }
  messageError = '';

  handlerError() {
    switch (this.exception) {
      case this.exception instanceof TypeORMError:
        this.typeORMHandlerError(this.exception);
        break;
      default:
        this.messageError =
          'Erro não indentificado no servidor, tente novamente mais tarde.';
    }
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

  typeORMHandlerError(exception: TypeORMError & typeORMErrorDetails) {
    this.messageError = typeORMHandler(exception.errno, exception.message);
  }
}
