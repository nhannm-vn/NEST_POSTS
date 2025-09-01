import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { UnprocessableEntityException, ValidationPipe } from '@nestjs/common'
import { LoggingInterceptor } from './shared/interceptor/logging.interceptor'
import { TransformInterceptor } from './shared/interceptor/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  //Nghĩa là bạn bật validation toàn cục cho toàn bộ ứng dụng NestJS. để sử dụng dto validation data
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Tự động loại bỏ các field không được khai báo decorator trong DTO
      forbidNonWhitelisted: true, //Nếu có field không được khai báo decorator
      //trong dto thì sẽ báo lỗi khi client truyền lên
      transform: true, //Tự động chuyển hóa kiểu dữ liệu obj theo class khai báo trong dto
      transformOptions: {
        enableImplicitConversion: true, //Tự động chuyển dữ liệu theo decorator, truyền lên number => string
      },
      exceptionFactory: (validationErrors) => {
        //Custom message là cái mảng chứa các obj
        //có field và error rõ ràng
        return new UnprocessableEntityException(
          //Đi qua cái mảng lỗi và custom thành các obj hợp lí cho message
          validationErrors.map((error) => {
            return {
              field: error.property,
              //Object.values: lấy toàn bộ value và trả dưới dạng mảng
              //nghĩa là lấy value của key trong obj. Ta được cái mảng
              //sau đó nối lại bằng dấu ,
              error: Object.values(error.constraints as any).join(', '),
            }
          }),
        )
      },
    }),
  )
  //test interceptors
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
