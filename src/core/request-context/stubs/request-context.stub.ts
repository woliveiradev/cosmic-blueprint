import { RequestContext, RequestContextProps } from '../types';

export class RequestContextStub implements RequestContext {
  public getContext(): RequestContextProps {
    return {
      correlationId: 'req-1',
      client: {
        ip: '127.0.0.1',
      },
      request: {
        method: '/',
        url: 'GET',
      },
      buildInfo: {
        appVersion: '1.0',
      },
    };
  }

  public setContext(): void {
    return;
  }

  public hasContext(): boolean {
    return true;
  }
}
