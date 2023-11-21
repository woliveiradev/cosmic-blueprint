export interface RequestContextProps {
  correlationId: string;
  hostname: string;
  request: {
    method: string;
    url: string;
  };
  client: {
    ip?: string;
    userAgent?: string;
  };
  buildInfo: {
    appVersion: string;
  };
}

export interface RequestContext {
  getContext(): RequestContextProps;
  setContext(context: RequestContextProps, callback: () => unknown): void;
  hasContext(): boolean;
}
