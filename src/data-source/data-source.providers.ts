import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { CreateUsersTable1683988946303 } from './migrations/1683988946303-create-Users-Table';
import { CreatePostsTable1683996086303 } from './migrations/1683996086303-create-Posts-Table';
import { CreateCommentsTable1683997987671 } from './migrations/1683997987671-create-Comments-Table';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';

config();

export const objConfig: DataSourceOptions = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User, Post, Comment],
  synchronize: true,
  migrations: [
    CreateUsersTable1683988946303,
    CreatePostsTable1683996086303,
    CreateCommentsTable1683997987671,
  ],
};

export const dataSource = new DataSource(objConfig);

dataSource.initialize();
