import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ContextMiddleware } from './middleware.context';

@Module({
  providers: [ContextMiddleware],
})
export class ContextModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes('*');
  }
}
