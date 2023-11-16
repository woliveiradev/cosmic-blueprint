export type RequestId = string;

export interface RequestContext {
  getRequestId(): string;
  setRequestId(requestId: RequestId): void;
}
