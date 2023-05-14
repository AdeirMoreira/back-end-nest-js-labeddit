import { IsNumberString } from 'class-validator';

export class idPost {
  @IsNumberString({ locale: 'pt-PT' }, { message: 'Parametro idPost inválido' })
  id: number;
}
