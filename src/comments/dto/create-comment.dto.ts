import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'O conteúdo do comentario é obrigatório' })
  @IsString({ message: 'O conteúdo do comentario deve ser uma string' })
  conteudo: string;

  @IsNotEmpty({ message: 'O autor do comentario é obrigatório' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'O id do usuario autor do comentario deve ser um número' },
  )
  idUser: number;

  @IsNotEmpty({ message: 'O id do post é obrigatório' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'O id do post deve ser um número' },
  )
  idPost: number;
}
