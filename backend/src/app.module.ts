import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UsersModule, GroupsModule],
})
export class AppModule {}
