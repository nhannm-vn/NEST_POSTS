import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

//Customer response trước khi trả về
export interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        //Móc thêm cái status trước khi trả về
        const ctx = context.switchToHttp()
        const response = ctx.getResponse()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const statusCode = response.statusCode
        return { data, statusCode }
      }),
    )
  }
}
