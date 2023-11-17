export interface RequestContextProps {
  requestId: string;
  idempotencyKey?: string;
}

export interface RequestContext {
  getContext(): RequestContextProps;
  setContext(context: RequestContextProps, callback: () => unknown): void;
}
