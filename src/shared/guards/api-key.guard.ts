// Là chốt chặn trước controller.
// Quyết định request có được đi tiếp hay bị chặn.
// Thường dùng phân quyền cho accessToken, hoặc api-key để thanh toán

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { REQUEST_API_KEY } from '../constants/auth.constant'
import { Request } from 'express'
import envConfig from '../config'

@Injectable()
export class APIKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const xAPIKey = request.headers[REQUEST_API_KEY]
    if (xAPIKey !== envConfig.SECRET_API_KEY) {
      throw new UnauthorizedException()
    }
    return true
  }
}
