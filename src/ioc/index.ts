import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { EventBridgeModule } from 'core/event-bridge/ioc';
import { HttpExceptionHandler } from 'core/exceptions/http.exception';

@Module({
  imports: [EventBridgeModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionHandler,
    },
  ],
})
export class RootModule {}
