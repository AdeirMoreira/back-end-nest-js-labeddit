import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Posts' })
export class Post {
  @PrimaryGeneratedColumn('increment')
  idPost: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  titulo: string;

  @Column({ type: 'text', nullable: false })
  conteudo: string;

  @ManyToOne(() => User, (user) => user.idUser)
  @Column({ name: 'idAutorIdUser', type: 'int', nullable: false })
  idUser: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;

  @OneToMany(() => Comment, (comment) => comment.idPost)
  comments: Comment[];
}
