import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  //Nghĩa là bạn bật validation toàn cục cho toàn bộ ứng dụng NestJS.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Tự động loại bỏ các field không được khai báo decorator trong DTO
      forbidNonWhitelisted: true, //Nếu có field không được khai báo decorator
      //trong dto thì sẽ báo lỗi khi client truyền lên
      transform: true, //Tự động chuyển hóa kiểu dữ liệu obj theo class khai báo trong dto
      transformOptions: {
        enableImplicitConversion: true, //Tự động chuyển dữ liệu theo decorator
      },
      exceptionFactory: (validationErrors) => {
        return new UnprocessableEntityException(
          validationErrors.map((error) => {
            return {
              field: error.property,
              //Object.values: lấy toàn bộ value và trả dưới dạng mảng
              error: Object.values(error.constraints as any).join(', '),
            }
          }),
        )
      },
    }),
  )
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
