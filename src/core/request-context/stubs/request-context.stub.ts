import { RequestContext, RequestContextProps } from '../types';

export class RequestContextStub implements RequestContext {
  public getContext(): RequestContextProps {
    return {
      requestId: 'req-1',
      idempotencyKey: 'x-idempotency-1',
    };
  }

  public setContext(): void {
    return;
  }
}
