/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common'
import envConfig from 'src/shared/config'
import { PrismaService } from 'src/shared/services/prisma.service'
//Nơi viết business logic (xử lý dữ liệu, kết nối DB...).
//Thường được đánh dấu @Injectable() để NestJS có thể inject vào controller.
@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  getPosts() {
    console.log(envConfig.ACCESS_TOKEN_SECRET)
    return this.prismaService.post.findMany()
  }
  createPost(body: any) {
    const userId = 1
    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    })
  }
  getPost(id: string) {
    return `Post ${id}`
  }
  updatePost(id: string, body: any) {
    return `Update post ${id}`
  }
  deletePost(id: string) {
    return `Delete post ${id}`
  }
}
