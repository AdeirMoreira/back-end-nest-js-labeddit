import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.findAndCount();
  }

  findOne(idUser: number) {
    return this.userRepository.findBy({ idUser });
  }

  update(idUser: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ idUser }, updateUserDto);
  }

  remove(idUser: number) {
    return this.userRepository.delete({ idUser });
  }
}
