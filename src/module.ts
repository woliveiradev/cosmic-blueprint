import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContextModule } from 'core/context';
import { LoggerModule } from 'core/logger';
import { EventBridgeModule } from 'core/event-bridge';
import { ExceptionsModule } from 'core/exceptions';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    ContextModule,
    ExceptionsModule,
    EventBridgeModule,
  ],
})
export class RootModule {}
