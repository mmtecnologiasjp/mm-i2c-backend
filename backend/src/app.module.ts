import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Users3Module } from './users3/users3.module';
import { UsersModule } from './users/users.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, Users3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
