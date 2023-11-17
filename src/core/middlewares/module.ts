import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestIdMiddleware } from './request-id.middleware';
import { RequestContextModule } from 'core/request-context/module';

@Module({
  imports: [RequestContextModule],
  providers: [RequestIdMiddleware],
})
export class MiddlewaresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
