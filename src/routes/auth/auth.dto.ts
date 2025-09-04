// Xác định cấu trúc request/response.
// Validate dữ liệu (kết hợp class-validator).

import { Exclude } from 'class-transformer'
import { IsString, Length } from 'class-validator'
import { Match } from 'src/shared/decorators/custom-validator.decorator'

export class LoginBodyDTO {
  @IsString()
  email: string
  @IsString()
  @Length(6, 20, { message: 'Mật khẩu phải từ 6 đến 20 ký tự' })
  password: string
}

export class RegisterBodyDTO extends LoginBodyDTO {
  @IsString()
  name: string
  @IsString()
  @Match('password', { message: 'Mật khẩu không khớp' })
  confirmPassword: string
}

//Serialization
export class LoginResDTO {
  accessToken: string
  refreshToken: string

  constructor(partial: Partial<LoginResDTO>) {
    Object.assign(this, partial)
  }
}

export class RegisterResDTO {
  id: number
  email: string
  name: string
  @Exclude()
  password: string

  // @Expose()
  // get fullName(): string {
  //   return `${this.email} - ${this.name}`
  // }

  createdAt: Date
  updatedAt: Date
  constructor(partial: Partial<RegisterResDTO>) {
    Object.assign(this, partial)
  }
}

//RefreshToken
export class RefreshTokenBodyDTO {
  @IsString()
  refreshToken: string
}

export class RefreshTokenResDTO extends LoginResDTO {}
