import { HttpStatus } from '@nestjs/common';

export class SuccessResponse {
  static updated = (affected: number, statusCode?: number) => {
    return {
      statusCode: statusCode || HttpStatus.OK,
      message: `${affected} registros atualizados.`,
    };
  };

  static deleted = (affected: number, statusCode?: number) => {
    return {
      statusCode: statusCode || HttpStatus.OK,
      message: `${affected} registros deletados.`,
    };
  };
}
