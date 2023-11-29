import { AsyncLocalStorage } from 'async_hooks';
import { ContextNotFound } from './exceptions/context-not-found.exception';

export class Context {
  static readonly store = new AsyncLocalStorage();

  static has(): boolean {
    return !!this.store.getStore();
  }

  static get() {
    /*
      ContextNotFound is an error that should only happen in development so that
      the developer doesn't try to take context data when it doesn't exist
     */
    const store = this.store.getStore();
    if (!store) throw new ContextNotFound();
    return store;
  }

  static new(context: any, callback: () => unknown): void {
    this.store.run(context, callback);
  }
}
