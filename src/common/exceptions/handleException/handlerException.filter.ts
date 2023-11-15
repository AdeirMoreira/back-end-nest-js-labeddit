import { HttpException, HttpStatus } from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { typeORMHandler } from './typeORMError/typeORM.handler';

export const DEFAULT_MESSAGE = 'Erro interno no servidor.';
export class handleExceptionFilter {
  messageError: string;

  constructor(private exception: any) {
    this.handlerError();
  }

  handlerError() {
    if (this.exception instanceof TypeORMError) {
      this.messageError = typeORMHandler(this.exception);
    } else {
      this.messageError = DEFAULT_MESSAGE;
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
}
