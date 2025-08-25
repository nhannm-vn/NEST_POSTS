import { Injectable } from '@nestjs/common'
//Nơi viết business logic (xử lý dữ liệu, kết nối DB...).
//Thường được đánh dấu @Injectable() để NestJS có thể inject vào controller.
@Injectable()
export class postsService {
  getPosts(): string {
    return 'All posts'
  }
  createPost(body: any) {
    return body
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
