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
