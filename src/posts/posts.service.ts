import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    await this.getAutor(createPostDto.idUser);
    return this.postRepository.save(createPostDto);
  }

  findAll() {
    return this.postRepository.findAndCount({
      relations: { comments: true },
    });
  }

  findOne(id: number) {
    return this.postRepository.findOneBy({ idPost: id });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.update({ idPost: id }, updatePostDto);
  }

  remove(id: number) {
    return this.postRepository.delete({ idPost: id });
  }

  async getAutor(idAutor: number) {
    const autor = await this.userRepository.findOneBy({ idUser: idAutor });
    if (!autor) {
      throw new NotFoundException('Autor não encontrado');
    } else {
      return autor;
    }
  }
}
