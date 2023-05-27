import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { idUser } from './dto/idUser.dto';
import { User } from './entities/user.entity';
import { Public } from 'src/auth/public-routes/public-routes';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto & User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<[User[], number]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: idUser) {
    const { id } = params;
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param() params: idUser, @Body() updateUserDto: UpdateUserDto) {
    const { id } = params;
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() params: idUser) {
    const { id } = params;
    return this.usersService.remove(+id);
  }
}
