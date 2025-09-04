import { Prisma } from '@prisma/client'

//type predicate: dự đoán kiểu dữ liệu
export function isUniqueConstraintPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
}
//: error is Prisma.PrismaClientKnownRequestError để ts hiểu rằng nếu true thì chắc chắn error sẽ là
//PrismaClientKnownRequestError. Khi đó bên kia chấm sẽ ra chuẩn mà không bị lỗi và chấm sẽ không show ra

export function isNotFoundPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025'
}
