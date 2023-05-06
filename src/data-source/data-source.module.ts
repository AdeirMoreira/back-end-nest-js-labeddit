import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { User } from 'src/users/entities/user.entity';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 100,
      autoLoadEntities: true,
    }),
  ],
})
export class DataSourceModule {}
