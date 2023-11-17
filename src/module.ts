import { Module } from '@nestjs/common';
import { EventBridgeModule } from 'core/event-bridge/module';
import { ExceptionsModule } from 'core/exceptions/module';
import { MiddlewaresModule } from 'core/middlewares/module';
import { RequestContextModule } from 'core/request-context/module';

@Module({
  imports: [
    RequestContextModule,
    MiddlewaresModule,
    ExceptionsModule,
    EventBridgeModule,
  ],
})
export class RootModule {}
