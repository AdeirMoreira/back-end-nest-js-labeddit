import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome de usuário é obrigatorio' })
  @IsString({ message: 'O nome de usuário deve ser uma string' })
  userName: string;

  @IsEmail(undefined, { message: 'O email fornecido não é válido' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatoria' })
  @IsString({ message: 'A senha deve ser uma string' })
  @Length(8, undefined, {
    message: 'A senha deve conter pelo menos 8 caracteres',
  })
  senha: string;
}
