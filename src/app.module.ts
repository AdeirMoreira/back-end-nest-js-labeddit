import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSourceModule } from './data-source/data-source.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DataSourceModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
