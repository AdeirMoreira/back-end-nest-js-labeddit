import { IsNumberString } from 'class-validator';

export class idUser {
  @IsNumberString({ locale: 'pt-PT' }, { message: 'Parametro idUser inválido' })
  id: number;
}
