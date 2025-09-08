import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TokenPayload } from '../types/jwt.type'
import { Request } from 'express'
import { REQUEST_USER_KEY } from '../constants/auth.constant'

export const ActiveUser = createParamDecorator(
  (
    field: keyof TokenPayload | undefined, //
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest<Request>()
    const user: TokenPayload | undefined = request[REQUEST_USER_KEY]
    return field ? user?.[field] : user
  },
)
