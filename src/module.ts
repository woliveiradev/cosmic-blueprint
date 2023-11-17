import { Module } from '@nestjs/common';
import { EventBridgeModule } from 'core/event-bridge';
import { ExceptionsModule } from 'core/exceptions';
import { MiddlewaresModule } from 'core/middlewares';
import { RequestContextModule } from 'core/request-context';

@Module({
  imports: [
    RequestContextModule,
    MiddlewaresModule,
    ExceptionsModule,
    EventBridgeModule,
  ],
})
export class RootModule {}
