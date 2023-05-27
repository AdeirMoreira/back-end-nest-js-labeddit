import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import sucessResponse from 'src/common/success/sucess.response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async findAll() {
    const users = await this.userRepository.findAndCount();
    if (users.length) {
      return users;
    } else {
      throw new NotFoundException('Nenhum usuário cadastrado.');
    }
  }

  async findOne(idUser: number) {
    const user = await this.userRepository.findOne({
      where: { idUser },
      relations: { posts: true },
    });
    if (user) {
      return user;
    } else {
      throw new NotFoundException(
        'Não foi encontrado nenhum usuário com o id fornecido.',
      );
    }
  }

  async findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async update(idUser: number, updateUserDto: UpdateUserDto) {
    const { affected } = await this.userRepository.update(
      { idUser },
      updateUserDto,
    );
    if (affected) {
      return sucessResponse.res(
        HttpStatus.OK,
        `${affected} registros atualizados.`,
      );
    } else {
      throw new NotFoundException(
        'Não foi encontrado nenhum usuário com o id fornecido.',
      );
    }
  }

  async remove(idUser: number) {
    const { affected } = await this.userRepository.delete({ idUser });
    if (affected) {
      return sucessResponse.res(
        HttpStatus.OK,
        `${affected} registros deletados.`,
      );
    } else {
      throw new NotFoundException(
        'Não foi encontrado nenhum usuário com o id fornecido.',
      );
    }
  }
}
