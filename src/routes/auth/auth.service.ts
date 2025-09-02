import { ConflictException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { HashingService } from 'src/shared/services/hashing.service'
import { PrismaService } from 'src/shared/services/prisma.service'
import { LoginBodyDTO, RegisterBodyDTO } from './auth.dto'

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

  async login(body: LoginBodyDTO) {
    try {
      //Validate email có nằm trong database và password có khớp hay không
      const user = await this.prismaService.user.findUnique({
        where: {
          email: body.email,
        },
      })

      if (!user) {
        throw new UnauthorizedException('Account is not exist')
      }

      const isPasswordMatch = await this.hashingService.compare(body.password, user.password)
      if (!isPasswordMatch) {
        //Mình muốn 422 để người dùng thấy dưới ô nhập password luôn
        throw new UnprocessableEntityException([
          {
            field: 'password',
            error: 'Password is incorrect',
          },
        ])
      }
    } catch (error) {
      console.log(error)
    }
  }
}
