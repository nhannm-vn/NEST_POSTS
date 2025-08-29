import { ConflictException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { HashingService } from 'src/shared/services/hashing.service'
import { PrismaService } from 'src/shared/services/prisma.service'
import { RegisterBodyDTO } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly prismaService: PrismaService,
  ) {}
  //**register phải dùng async vì nó gọi đến các hàm bất đồng bộ
  //**dùng async-await thì dùng try-catch
  async register(body: RegisterBodyDTO) {
    try {
      //hash password trước khi lưu vào db
      const hashedPassword = await this.hashingService.hash(body.password)
      //nhờ prisma service thực hiện
      const user = await this.prismaService.user.create({
        data: {
          email: body.email,
          password: hashedPassword,
          name: body.name,
        },
      })
      return user
    } catch (error) {
      //NestJS đã có sẵn ConflictException (HTTP 409) để báo lỗi trùng dữ liệu.
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Email already exists')
      }
      //500
      throw error
    }
  }
}
