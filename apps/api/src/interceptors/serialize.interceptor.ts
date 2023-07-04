import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToInstance } from 'class-transformer';

interface ClassConstructon {
  new (...args: any[]): object;
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructon) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data);
      }),
    );
  }
}
