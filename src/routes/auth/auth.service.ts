import { ConflictException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { HashingService } from 'src/shared/services/hashing.service'
import { PrismaService } from 'src/shared/services/prisma.service'
import { LoginBodyDTO, RegisterBodyDTO } from './auth.dto'
import { TokenService } from 'src/shared/services/token.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
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

    const tokens = await this.generateTokens({ userId: user.id })
    //Sau khi xác thực email và password thành công thì tiến hành ký 2 token
    //và trả ra cho người dùng
    return tokens
  }

  //Method giúp ký token và lưu vào trong database
  async generateTokens(payload: { userId: number }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.tokenService.signAccessToken(payload),
      this.tokenService.signRefreshToken(payload),
    ])
    //*Decode để lấy thời điểm hết hạn
    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)
    //Lưu vào trong db
    await this.prismaService.refreshToken.create({
      data: {
        token: refreshToken,
        userId: payload.userId,
        expiresAt: new Date(decodedRefreshToken.exp * 1000),
      },
    })

    return { accessToken, refreshToken }
  }

  async refreshToken(refreshToken: string) {
    try {
      //1. Kiểm tra token có đúng và hợp lệ hay không
      const { userId } = await this.tokenService.verifyRefreshToken(refreshToken)
      //2. Kiểm tra refreshToken có tồn tại trong database không
      //findUniqueOrThrow: thằng này khi có lỗi sẽ throw ra lỗi còn thằng findUnique
      //chỉ return về null
      await this.prismaService.refreshToken.findUniqueOrThrow({
        where: {
          token: refreshToken,
        },
      })
      //3. Tiến hành xóa token cũ
      await this.prismaService.refreshToken.delete({
        where: {
          token: refreshToken,
        },
      })
      //4. Tiến hành tạo mới access_token và refresh_token
      return await this.generateTokens({ userId: userId })
    } catch (error) {
      //Trường hợp đã refreshToken rồi hãy thông báo cho user biết
      //refreshToken đã bị đánh cắp (nghĩa là refreshToken của họ không còn trong db)
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new UnauthorizedException('Refresh token has been revoked')
      }
      //Dành cho các lỗi chung chung
      throw new UnauthorizedException()
    }
  }
}
