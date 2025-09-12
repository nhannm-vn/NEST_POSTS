import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { PostsService } from './posts.service'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { AuthType, ConditionGuard } from 'src/shared/constants/auth.constant'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { CreatePostBodyDTO, GetPostItemDTO } from './post.dto'
// import { AuthenticationGuard } from 'src/shared/guards/authentication.guard'

//Nơi nhận request từ client (HTTP request).
@Controller('posts')
export class PostsController {
  //Kiến trúc DI giúp flexible đưa dữ liệu từ ngoài vào
  //Dependency
  constructor(private readonly postsService: PostsService) {}
  // @UseGuards(AccessTokenGuard)
  // @UseGuards(APIKeyGuard)
  @Auth([AuthType.Bearer, AuthType.APIKey], { condition: ConditionGuard.And })
  //Khai báo global rồi nên không cần
  // @UseGuards(AuthenticationGuard)
  @Get()
  getPosts(@ActiveUser('userId') userId: number) {
    return this.postsService.getPosts(userId).then((posts) => posts.map((post) => new GetPostItemDTO(post)))
  }

  @Auth([AuthType.Bearer])
  @Post()
  createPost(@Body() body: CreatePostBodyDTO, @ActiveUser('userId') userId: number) {
    return this.postsService.createPost(userId, body)
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
