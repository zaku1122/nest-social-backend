import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesModule } from './likes/likes.module';
import { NotificationsGateway } from './notifications/notifications.gateway';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest-social'),UsersModule, PostsModule, LikesModule],
  controllers: [AppController],
  providers: [AppService, NotificationsGateway],
})
export class AppModule {}
