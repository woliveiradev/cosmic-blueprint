import { RequestContext as NestRequestContext } from 'nestjs-request-context';
import { RequestContext, RequestId } from './types';

class AppRequestContext extends NestRequestContext {
  requestId: string;
}

export class RequestContextImpl implements RequestContext {
  private getContext(): AppRequestContext {
    return AppRequestContext.currentContext.req;
  }

  public setRequestId(requestId: RequestId): void {
    const context = this.getContext();
    context.requestId = requestId;
  }

  public getRequestId(): RequestId {
    return this.getContext().requestId;
  }
}
