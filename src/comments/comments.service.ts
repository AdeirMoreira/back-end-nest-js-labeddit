import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    await this.getAutor(createCommentDto.idUser);
    await this.getPost(createCommentDto.idPost);
    return this.commentRepository.save(createCommentDto);
  }

  findAll() {
    return this.commentRepository.findAndCount();
  }

  findOne(id: number) {
    return this.commentRepository.findOneBy({ idComment: id });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.commentRepository.update({ idComment: id }, updateCommentDto);
  }

  remove(id: number) {
    return this.commentRepository.delete({ idComment: id });
  }

  async getPost(idPost: number) {
    const post = await this.postRepository.findOneBy({ idPost: idPost });
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    } else {
      return post;
    }
  }

  async getAutor(idUser: number) {
    const autor = await this.userRepository.findOneBy({ idUser: idUser });
    if (!autor) {
      throw new NotFoundException('Autor não encontrado');
    } else {
      return autor;
    }
  }
}
