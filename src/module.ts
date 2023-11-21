import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventBridgeModule } from 'core/event-bridge';
import { ExceptionsModule } from 'core/exceptions';
import { LoggerModule } from 'core/logger';
import { MiddlewaresModule } from 'core/middlewares';
import { RequestContextModule } from 'core/request-context';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RequestContextModule,
    MiddlewaresModule,
    LoggerModule,
    ExceptionsModule,
    EventBridgeModule,
  ],
})
export class RootModule {}
