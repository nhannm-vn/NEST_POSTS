import { Body, Controller, Post, SerializeOptions } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterBodyDTO, RegisterResDTO } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @SerializeOptions({ type: RegisterResDTO })
  @Post('register')
  // Nếu controller trả về Promise<T> → NestJS sẽ await Promise đó, rồi gửi T làm response.
  //nghĩa là có trả về promise nó cũng sẽ await xong mới đưa dữ liệu cho mình
  register(@Body() body: RegisterBodyDTO) {
    return this.authService.register(body)
  }
}
