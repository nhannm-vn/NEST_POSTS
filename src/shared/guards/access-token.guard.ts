//Những route nào cần có access-token truyền lên trong headers
//thì mới cho phép. Nghĩa là check xem có truyền lên access_token
//không mới cho chạy guard đó

// Là chốt chặn trước controller.
// Quyết định request có được đi tiếp hay bị chặn.
// Thường dùng phân quyền cho accessToken

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { TokenService } from '../services/token.service'
import { REQUEST_USER_KEY } from '../constants/auth.constant'
import { Request } from 'express'

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()

    const accessToken = request.headers.authorization?.split(' ')[1]

    //Sau khi kiểm tra xem có accessToken không. Nếu chưa thì không cho đi qua
    if (!accessToken) {
      throw new UnauthorizedException('Access token missing')
      // return false
    }

    try {
      //Verify accessToken
      const decodedAccessToken = await this.tokenService.verifyAccessToken(accessToken)
      // Lưu payload vào request để controller chuyển đi tiếp
      //thường thì ngta lưu vào thuộc tính user
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      request[REQUEST_USER_KEY] = decodedAccessToken
      return true
    } catch {
      throw new UnauthorizedException('Invalid or expired access token')
      // return false
    }
  }
}
