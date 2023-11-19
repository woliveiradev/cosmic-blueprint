import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestContextModule } from 'core/request-context/module';
import { ContextMiddleware } from './context.middleware';

@Module({
  imports: [RequestContextModule],
  providers: [ContextMiddleware],
})
export class MiddlewaresModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes('*');
  }
}
