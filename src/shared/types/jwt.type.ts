//*Định nghĩa kiểu dữ liệu khi decode token
export interface TokenPayload {
  userId: number
  exp: number
  iat: number
}
