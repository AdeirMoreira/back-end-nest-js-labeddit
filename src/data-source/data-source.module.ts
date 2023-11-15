import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceObjectConfig } from './data-source.providers';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceObjectConfig,
      retryAttempts: 10,
      retryDelay: 100,
      autoLoadEntities: false,
    }),
  ],
})
export class DataSourceModule {}
