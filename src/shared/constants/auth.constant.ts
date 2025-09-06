export const REQUEST_USER_KEY = 'user'
export const REQUEST_API_KEY = 'x-api-key'

export const AuthType = {
  Bearer: 'Bearer',
  None: 'None',
  APIKey: 'APIKey',
} as const

//*Từ cái obj trên lấy ra cái type là value cụ thể cho từng thằng
//type sinh ra từ chính object đó
export type AuthTypeType = (typeof AuthType)[keyof typeof AuthType]

export const ConditionGuard = {
  And: 'and',
  Or: 'or',
} as const

export type ConditionGuardType = (typeof ConditionGuard)[keyof typeof ConditionGuard]
