/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { UpdatePostBodyDTO } from './post.dto'
//Nơi viết business logic (xử lý dữ liệu, kết nối DB...).
//Thường được đánh dấu @Injectable() để NestJS có thể inject vào controller.
@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  getPosts(userId: number) {
    return this.prismaService.post.findMany({
      where: {
        authorId: userId,
      },
      // Lay luon array user
      include: {
        author: {
          omit: {
            password: true,
          },
        },
      },
    })
  }

  createPost(userId: number, body: any) {
    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      }, // Lay luon array user
      include: {
        author: {
          omit: {
            password: true,
          },
        },
      },
    })
  }

  getPost(postId: number) {
    return this.prismaService.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
      // Lay luon array user
      include: {
        author: {
          omit: {
            password: true,
          },
        },
      },
    })
  }

  updatePost(postId: number, body: UpdatePostBodyDTO) {
    return this.prismaService.post.update({
      where: {
        id: postId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
      },
    })
  }

  deletePost(id: string) {
    return `Delete post ${id}`
  }
}
