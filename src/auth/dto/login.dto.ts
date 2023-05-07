import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class LoginDTO extends OmitType(CreateUserDto, ['userName'] as const) {}
