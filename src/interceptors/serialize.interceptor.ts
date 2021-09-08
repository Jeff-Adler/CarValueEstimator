import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

// This simply guarentees that anything passed into Serialize is a class
interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled by the request handler

    return handler.handle().pipe(
      // data = current state of the response
      map((data: any) => {
        // Run something before the response is sent out
        return plainToClass(this.dto, data, {
          // this ensures that only properties with the @expose decorator in UserDto are shown
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
