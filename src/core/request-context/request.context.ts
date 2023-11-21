import { AsyncLocalStorage } from 'async_hooks';
import { RequestContext, RequestContextProps } from './types';
import { RequestContextNotFound } from './exceptions/request-context-not-found.exception';

export class RequestContextImpl implements RequestContext {
  private readonly store = new AsyncLocalStorage<RequestContextProps>();

  public hasContext(): boolean {
    return !!this.store.getStore();
  }

  public getContext(): RequestContextProps {
    /*
      RequestNotFound is an error that should only happen in development so that
      the developer doesn't try to take context data when it doesn't exist
     */
    const store = this.store.getStore();
    if (!store) throw new RequestContextNotFound();
    return store;
  }

  public setContext(
    context: RequestContextProps,
    callback: () => unknown,
  ): void {
    this.store.run(context, callback);
  }
}
