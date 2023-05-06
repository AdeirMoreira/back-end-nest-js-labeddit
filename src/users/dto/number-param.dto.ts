import { IsNumberString } from 'class-validator';

export class FindOneParams {
  @IsNumberString({ locale: 'pt-PT' }, { message: 'Parametro idUser inválido' })
  id: number;
}
