import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GlobalException } from '../global-exception';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalException,
    },
  ],
})
export class ExceptionsModule {}
