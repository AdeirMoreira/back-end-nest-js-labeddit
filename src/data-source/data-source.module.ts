import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { objConfig } from './data-source.providers';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...objConfig,
      retryAttempts: 10,
      retryDelay: 100,
      autoLoadEntities: false,
    }),
  ],
})
export class DataSourceModule {}
