import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { PostsService } from './posts.service'
import { APIKeyGuard } from 'src/shared/guards/api-key.guard'
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'

//Nơi nhận request từ client (HTTP request).
@Controller('posts')
export class PostsController {
  //Kiến trúc DI giúp flexible đưa dữ liệu từ ngoài vào
  //Dependency
  constructor(private readonly postsService: PostsService) {}
  @UseGuards(AccessTokenGuard)
  @UseGuards(APIKeyGuard)
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
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(id)
  }
}
