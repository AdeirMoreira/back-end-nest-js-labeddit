import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { SuccessResponse } from 'src/common/success/sucess.response';
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
    console.log(createPostDto);

    const response = await this.postRepository.save(createPostDto);
    console.log(response);
    return response;
  }

  async findAll() {
    const posts = await this.postRepository.findAndCount({
      relations: { comments: true },
    });
    if (posts.length) {
      return posts;
    } else {
      throw new NotFoundException('Nenhum post encontrado.');
    }
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: {
        idPost: id,
      },
      relations: { comments: true },
    });
    if (post) {
      return post;
    } else {
      throw new NotFoundException('Nenhum post encontrado com o id fornecido.');
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const { affected } = await this.postRepository.update(
      { idPost: id },
      updatePostDto,
    );
    if (affected) {
      return SuccessResponse.updated(affected);
    } else {
      throw new NotFoundException('Nenhum post encontrado com o id fornecido.');
    }
  }

  async remove(id: number) {
    const { affected } = await this.postRepository.delete({ idPost: id });
    if (affected) {
      return SuccessResponse.deleted(affected);
    } else {
      throw new NotFoundException('Nenhum post encontrado com o id fornecido.');
    }
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
