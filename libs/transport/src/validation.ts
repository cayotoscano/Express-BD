import { ValidationPipe, type Type } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export function dtoPipe(dto: Type<unknown>, rpc = false) {
  return new ValidationPipe({
    expectedType: dto,
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    ...(rpc
      ? {
        exceptionFactory: (errors) =>
          new RpcException({
            statusCode: 400,
            message: errors.flatMap((error) =>
              Object.values(
                error.constraints ?? { nested: 'Dados inválidos' },
              ),
            ),
          }),
      }
      : {}),
  });
}
