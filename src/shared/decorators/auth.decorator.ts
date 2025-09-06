import { SetMetadata } from '@nestjs/common'
import { AuthTypeType, ConditionGuardType } from '../constants/auth.constant'

export const AUTH_TYPE_KEY = 'authType'

export const Auth = (authTypes: AuthTypeType[], options: { condition: ConditionGuardType }) => {
  return SetMetadata(AUTH_TYPE_KEY, { authTypes, options })
}
