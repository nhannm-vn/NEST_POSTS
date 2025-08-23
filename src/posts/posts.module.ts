import { Module } from '@nestjs/common'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'

//Dùng để gom nhóm các thành phần liên quan (controller, service, provider).
//Giống như một “folder logic” để dễ quản lý.

@Module({
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
