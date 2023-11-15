import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceObjectConfig } from './data-source.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceObjectConfig,
      retryAttempts: 10,
      retryDelay: 100,
      synchronize: false,
      autoLoadEntities: true,
    }),
  ],
})
export class DataSourceModule {}
