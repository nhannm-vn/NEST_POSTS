import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterBodyDTO, RegisterResDTO } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //*Dùng thằng này thì sẽ không customer response bằng interceptors được
  // @SerializeOptions({ type: RegisterResDTO })
  @Post('register')
  // Nếu controller trả về Promise<T> → NestJS sẽ await Promise đó, rồi gửi T làm response.
  //nghĩa là có trả về promise nó cũng sẽ await xong mới đưa dữ liệu cho mình
  async register(@Body() body: RegisterBodyDTO) {
    console.log('controller...')
    //*Vì mình serialization nên cần await để chờ dữ liệu
    return new RegisterResDTO(await this.authService.register(body))
  }
}
