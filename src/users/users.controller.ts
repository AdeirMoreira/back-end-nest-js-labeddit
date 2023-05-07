import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindOneParams } from './dto/number-param.dto';
import { User } from './entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto & User> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<[User[], number]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams): Promise<User[]> {
    const { id } = params;
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    const { id } = params;
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() params: FindOneParams): Promise<DeleteResult> {
    const { id } = params;
    return this.usersService.remove(+id);
  }
}
