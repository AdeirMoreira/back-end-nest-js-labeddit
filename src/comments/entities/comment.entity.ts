import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Comments' })
export class Comment {
  @PrimaryGeneratedColumn('increment')
  idComment: number;

  @Column('text', { nullable: false })
  conteudo: string;

  @ManyToOne(() => User, (user) => user.idUser)
  @JoinColumn({ name: 'idUser' })
  idUser: number;

  @ManyToOne(() => Post, (post) => post.idPost)
  @JoinColumn({ name: 'idPost' })
  idPost: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
