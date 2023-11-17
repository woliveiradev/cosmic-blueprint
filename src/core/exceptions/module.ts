import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionHandler } from './http.exception';
import { RequestContextModule } from 'core/request-context/module';

@Module({
  imports: [RequestContextModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionHandler,
    },
  ],
})
export class ExceptionsModule {}
