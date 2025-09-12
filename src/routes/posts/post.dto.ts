import { Type } from 'class-transformer'
import { IsString } from 'class-validator'
import { PostModel } from 'src/shared/models/post.model'
import { UserModel } from 'src/shared/models/user.model'

export class GetPostItemDTO extends PostModel {
  //Phải có thằng này để nó trỏ về UserModel
  //nếu không có thì nó vẫn trả về password
  @Type(() => UserModel)
  author: Omit<UserModel, 'password'>

  constructor(partial: Partial<GetPostItemDTO>) {
    super(partial)
    Object.assign(this, partial)
  }
}

export class CreatePostBodyDTO {
  @IsString()
  title: string
  @IsString()
  content: string
}
