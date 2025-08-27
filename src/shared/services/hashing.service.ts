import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'
//10 là mức mặc định hay dùng trong thực tế, cân bằng giữa tốc độ và bảo mật
const saltRounds = 10

@Injectable()
export class HashingService {
  hash(value: string) {
    return hash(value, saltRounds)
  }
  //Dùng để so sánh mk nhập vào và mk hash trong DB
  compare(value: string, hash: string) {
    return compare(value, hash)
  }
}
