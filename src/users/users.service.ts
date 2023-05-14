import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<CreateUserDto & User> {
    return this.userRepository.save(createUserDto);
  }

  findAll(): Promise<[User[], number]> {
    return this.userRepository.findAndCount();
  }

  findOne(idUser: number): Promise<User[]> {
    return this.userRepository.findBy({ idUser });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  update(idUser: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update({ idUser }, updateUserDto);
  }

  remove(idUser: number): Promise<DeleteResult> {
    return this.userRepository.delete({ idUser });
  }
}
