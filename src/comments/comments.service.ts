import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import sucessResponse from 'src/common/success/sucess.response';

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

  async findAll() {
    const comments = await this.commentRepository.findAndCount();
    if (comments.length) {
      return comments;
    } else {
      throw new NotFoundException('Não foram encontrados comentários.');
    }
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOneBy({ idComment: id });
    if (comment) {
      return comment;
    } else {
      throw new NotFoundException(
        'Não foi encontrado nenhum comentário com id infromado.',
      );
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const { affected } = await this.commentRepository.update(
      { idComment: id },
      updateCommentDto,
    );
    if (affected) {
      return sucessResponse.res(
        HttpStatus.OK,
        `${affected} registros atualizados`,
      );
    } else {
      throw new NotFoundException(
        'Nenhum comentário encontrado com o id fornecido.',
      );
    }
  }

  async remove(id: number) {
    const { affected } = await this.commentRepository.delete({ idComment: id });
    if (affected) {
      return sucessResponse.res(
        HttpStatus.OK,
        `${affected} registros atualizados`,
      );
    } else {
      throw new NotFoundException(
        'Nenhum comentário encontrado com o id fornecido.',
      );
    }
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
