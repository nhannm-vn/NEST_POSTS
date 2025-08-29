// Xác định cấu trúc request/response.
// Validate dữ liệu (kết hợp class-validator).

import { Exclude } from 'class-transformer'
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

//Serialization
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
