import { IsNumberString } from 'class-validator';

export class idComment {
  @IsNumberString(
    { locale: 'pt-PT' },
    { message: 'Parametro idComment inválido' },
  )
  id: number;
}
