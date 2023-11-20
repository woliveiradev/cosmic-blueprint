import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionHandler } from './http.exception';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionHandler,
    },
  ],
})
export class ExceptionsModule {}
