import { RequestContext as NestRequestContext } from 'nestjs-request-context';
import { RequestId } from './types';

export class AppRequestContext extends NestRequestContext {
  requestId: string;
}

export class RequestContext {
  static getContext(): AppRequestContext {
    return AppRequestContext.currentContext.req;
  }

  static setRequestId(requestId: RequestId): void {
    const context = this.getContext();
    context.requestId = requestId;
  }

  static getRequestId(): RequestId {
    return this.getContext().requestId;
  }
}
