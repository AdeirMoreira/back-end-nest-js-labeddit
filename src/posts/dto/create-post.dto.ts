import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'O título do post é obrigatório' })
  @IsString({ message: 'O título do post deve ser uma string' })
  titulo: string;

  @IsNotEmpty({ message: 'O conteúdo do post é obrigatório' })
  @IsString({ message: 'O conteúdo do post deve ser uma string' })
  conteudo: string;

  @IsNotEmpty({ message: 'O autor do post é obrigatório' })
  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { message: 'O id do usuario autor do post deve ser um número' },
  )
  idUser: number;
}
