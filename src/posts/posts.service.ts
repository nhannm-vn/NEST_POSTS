import { Injectable } from '@nestjs/common'

@Injectable()
export class PostsService {
  getPosts(): string {
    return 'All posts'
  }
  createPost(body: any) {
    return body
  }
}
