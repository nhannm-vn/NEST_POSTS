import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { PostsService } from './posts.service'

//Nơi nhận request từ client (HTTP request).
@Controller('posts')
export class PostsController {
  //Kiến trúc DI giúp flexible đưa dữ liệu từ ngoài vào
  constructor(private readonly postsService: PostsService) {}
  @Get()
  getPosts() {
    return this.postsService.getPosts()
  }
  @Post()
  createPost(@Body() body: any) {
    return this.postsService.createPost(body)
  }
  @Get(':id')
  //Lấy id bằng decorator Param
  getPost(@Param('id') id: string) {
    return this.postsService.getPost(id)
  }
  @Put(':id')
  updatePost(@Param('id') id: string, @Body() body: any) {
    return this.postsService.updatePost(id, body)
  }
}
