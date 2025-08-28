// Xác định cấu trúc request/response.
// Validate dữ liệu (kết hợp class-validator).

import { IsString } from 'class-validator'

export class LoginBodyDTO {
  @IsString()
  email: string
  @IsString()
  password: string
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString()
  name: string
  @IsString()
  confirmPassword: string
}
