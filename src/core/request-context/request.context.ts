import { AsyncLocalStorage } from 'async_hooks';
import { RequestContextProps } from './types';
import { RequestContextNotFound } from './exceptions/request-context-not-found.exception';

export class RequestContext {
  private readonly store = new AsyncLocalStorage<RequestContextProps>();

  public getContext(): RequestContextProps {
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
