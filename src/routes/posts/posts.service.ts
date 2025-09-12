/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'
import { UpdatePostBodyDTO } from './post.dto'
import { isNotFoundPrismaError } from 'src/shared/helpers'
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

  async getPost(postId: number) {
    try {
      const post = await this.prismaService.post.findUniqueOrThrow({
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
      return post
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new NotFoundException('Post item not found')
      }
      throw error
    }
  }

  async updatePost({ postId, userId, body }: { postId: number; userId: number; body: UpdatePostBodyDTO }) {
    try {
      const post = await this.prismaService.post.update({
        where: {
          id: postId,
          authorId: userId,
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
      return post
    } catch (error) {
      if (isNotFoundPrismaError(error)) {
        throw new NotFoundException('Post not found')
      }
      throw error
    }
  }

  deletePost(id: number) {
    return `Delete post ${id}`
  }
}
