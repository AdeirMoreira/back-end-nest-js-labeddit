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
import { FindOneParams } from './dto/number-param.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    const { id } = params;
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param() params: FindOneParams, @Body() updateUserDto: UpdateUserDto) {
    const { id } = params;
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() params: FindOneParams) {
    const { id } = params;
    return this.usersService.remove(+id);
  }
}
