import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { PostsService } from './posts.service'
import { Auth } from 'src/shared/decorators/auth.decorator'
import { AuthType, ConditionGuard } from 'src/shared/constants/auth.constant'
import { ActiveUser } from 'src/shared/decorators/active-user.decorator'
import { CreatePostBodyDTO, GetPostItemDTO, UpdatePostBodyDTO } from './post.dto'
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
  async createPost(@Body() body: CreatePostBodyDTO, @ActiveUser('userId') userId: number) {
    return new GetPostItemDTO(await this.postsService.createPost(userId, body))
  }

  @Get(':id')
  //Lấy id bằng decorator Param
  async getPost(@Param('id') id: number) {
    return new GetPostItemDTO(await this.postsService.getPost(Number(id)))
  }

  @Auth([AuthType.Bearer])
  @Put(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() body: UpdatePostBodyDTO, //
    @ActiveUser('userId') userId: number,
  ) {
    return new GetPostItemDTO(
      await this.postsService.updatePost({
        postId: Number(id),
        userId,
        body,
      }),
    )
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(Number(id))
  }
}
