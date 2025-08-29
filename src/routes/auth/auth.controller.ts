import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterBodyDTO, RegisterResDTO } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  //Chuyển thành async do ở dưới là await
  async register(@Body() body: RegisterBodyDTO) {
    // console.log(body)
    // return 'register'
    const result = await this.authService.register(body)
    return new RegisterResDTO(result)
  }
}
