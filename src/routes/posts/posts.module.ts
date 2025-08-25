import { Module } from '@nestjs/common'
import { PostsController } from './posts.controller'
import { postsService } from './posts.service'

//Dùng để gom nhóm các thành phần liên quan (controller, service, provider).
//Giống như một “folder logic” để dễ quản lý.

@Module({
  controllers: [PostsController],
  providers: [postsService],
})
export class PostsModule {}
