import { Global, Module } from '@nestjs/common'
import { PrismaService } from './services/prisma.service'
//File này mình sẽ để chế độ global cho toàn app thấy được luôn
//mình sẽ import services vào đây

const sharedServices = [PrismaService]

@Global()
@Module({
  providers: sharedServices,
  //đối với thằng shared global cần thêm cái exports
  exports: sharedServices,
})
export class SharedModule {}

/*
@Global() giúp biến module đó thành global module 
→ tất cả service mà nó export ra sẽ dùng được ở mọi module khác mà không 
cần import module thủ công nữa.
*/

//Mình xài prisma nên mặc định không cần cài dotenv thì vẫn đọc được
