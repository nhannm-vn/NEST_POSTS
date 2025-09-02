import { Global, Module } from '@nestjs/common'
import { PrismaService } from './services/prisma.service'
import { HashingService } from './services/hashing.service'
import { TokenService } from './services/token.service'
import { JwtModule } from '@nestjs/jwt'
//File này mình sẽ để chế độ global cho toàn app thấy được luôn
//mình sẽ import services vào đây

const sharedServices = [PrismaService, HashingService, TokenService]

@Global()
@Module({
  providers: sharedServices,
  //đối với thằng shared global cần thêm cái exports
  exports: sharedServices,
  imports: [JwtModule],
})
export class SharedModule {}

/*
@Global() giúp biến module đó thành global module 
→ tất cả service mà nó export ra sẽ dùng được ở mọi module khác mà không 
cần import module thủ công nữa.
*/
