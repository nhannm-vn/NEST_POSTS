import { plainToInstance } from 'class-transformer'
import fs from 'fs'
//module của Node.js dùng để làm việc với file.
import path from 'path'

// Kiểm tra coi thử có file env hay chưa
if (!fs.existsSync(path.resolve('.env'))) {
  console.log('Không tìm thấy file .env')
  process.exit(1)
}

//Đại diện cho value khai báo trong env
class ConfigSchema {
  DATABASE_URL: string
  ACCESS_TOKEN_SECRET: string
  ACCESS_TOKEN_EXPIRES_IN: string
  REFRESH_TOKEN_SECRET: string
  REFRESH_TOKEN_EXPIRES_IN: string
}

//*Muốn dùng validation thì phải biến object thành class
//thông qua class tranformer
//*Vì mình sử dụng class-validation
const configServer = plainToInstance(ConfigSchema, process.env)
