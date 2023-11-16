import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionHandler } from '../http.exception';
import { ContextModule } from 'core/context/ioc';

@Module({
  imports: [ContextModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionHandler,
    },
  ],
})
export class ExceptionsModule {}
