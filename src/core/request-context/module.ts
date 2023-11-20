import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestContextImpl } from './request.context';
import { ContextMiddleware } from './context.middleware';
import { REQUEST_CONTEXT_TOKEN } from './tokens';

@Module({
  providers: [
    {
      provide: REQUEST_CONTEXT_TOKEN,
      useClass: RequestContextImpl,
    },
    ContextMiddleware,
  ],
  exports: [REQUEST_CONTEXT_TOKEN],
})
export class RequestContextModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware).forRoutes('*');
  }
}
