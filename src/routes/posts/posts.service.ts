/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
//Nơi viết business logic (xử lý dữ liệu, kết nối DB...).
//Thường được đánh dấu @Injectable() để NestJS có thể inject vào controller.
@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  getPosts() {
    return this.prismaService.post.findMany()
  }

  createPost(userId: number, body: any) {
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
