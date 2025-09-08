import { SetMetadata } from '@nestjs/common'
import { AuthTypeType, ConditionGuard, ConditionGuardType } from '../constants/auth.constant'

export const AUTH_TYPE_KEY = 'authType'

export type AuthTypeDecoratorPayload = { authTypes: AuthTypeType[]; options: { condition: ConditionGuardType } }

export const Auth = (authTypes: AuthTypeType[], options?: { condition: ConditionGuardType }) => {
  //Ý nghĩa: nếu a khác null và undefined thì lấy a, còn nếu a là null hoặc undefined thì lấy b.
  return SetMetadata(AUTH_TYPE_KEY, { authTypes, options: options ?? { condition: ConditionGuard.And } })
}
