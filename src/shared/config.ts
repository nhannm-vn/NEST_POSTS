import { plainToInstance } from 'class-transformer'
import { IsString, validateSync } from 'class-validator'
import fs from 'fs'
//module của Node.js dùng để làm việc với file.
import path from 'path'
import { config } from 'dotenv'

//*Để chắc chắn rằng lúc nào cũng đọc được file .env
//**Mặc dù mình đang xài prisma nên không cần cài thư viện đọc env nào cả
config({
  path: '.env',
})

// Kiểm tra coi thử có file env hay chưa
if (!fs.existsSync(path.resolve('.env'))) {
  console.log('Không tìm thấy file .env')
  process.exit(1)
}

//Đại diện cho value khai báo trong env
class ConfigSchema {
  @IsString()
  DATABASE_URL: string
  @IsString()
  ACCESS_TOKEN_SECRET: string
  @IsString()
  ACCESS_TOKEN_EXPIRES_IN: string
  @IsString()
  REFRESH_TOKEN_SECRET: string
  @IsString()
  REFRESH_TOKEN_EXPIRES_IN: string
}

//*Muốn dùng validation thì phải biến object thành class
//thông qua class tranformer nghĩa là cho nó hiểu obj này là instance của th này
//và phải validate theo rule này
//*Vì mình sử dụng class-validation
const configServer = plainToInstance(ConfigSchema, process.env, {
  //*Mặc định các kiểu dữ liệu bên env là string, muốn ép kiểu phải config thằng này
  enableImplicitConversion: true,
})

//*Bình thường hàm này là promise nhưng muốn không cần promise thì
//xài validateSync
//*Mình sẽ truyền vào obj nhưng obj đó phải là instance của class đã tranformer
//*Thằng này sẽ đợi khi nào có lỗi thì nó sẽ chạy và throw ra
const errorArray = validateSync(configServer)
//Nếu có mảng lỗi thì nó sẽ throw ra dưới dạng dễ nhìn hơn
if (errorArray.length > 0) {
  console.log('Cac gia tri khai bao trong file env khong hop le: ')
  const error = errorArray.map((eItem) => {
    return {
      property: eItem.property,
      constraints: eItem.constraints,
      value: eItem.value as undefined,
    }
  })
  throw error
}

const envConfig = configServer
//*Thằng envConfig này vì đã được chuyển thành obj của chính xác
//instance nào rồi nên đem qua sử dụng ở các file khác gọi ý một cách dễ dàng
export default envConfig
//*Mục đích của file config này giúp cho env viết đúng theo schema
//đồng thời xài ở các file khác thì nó sẽ gợi ý tránh mình phải copy tên
