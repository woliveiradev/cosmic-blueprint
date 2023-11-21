import { beforeEach, describe, expect, it } from 'vitest';
import { RequestContext } from './types';
import { RequestContextImpl } from './request.context';
import { RequestContextNotFound } from './exceptions/request-context-not-found.exception';

const requestContextParams = {
  correlationId: 'req-1',
  hostname: 'server-1',
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

describe('Request Context', () => {
  let requestContext: RequestContext;

  beforeEach(() => {
    requestContext = new RequestContextImpl();
  });

  it("should be able to throw an error when trying to get the context when it doesn't exist", () => {
    expect(() => requestContext.getContext()).toThrowError(
      new RequestContextNotFound(),
    );
  });

  it('should de able to get context', () => {
    requestContext.setContext(requestContextParams, () => {
      const context = requestContext.getContext();
      expect(context).toMatchObject(requestContextParams);
    });
  });

  it('should be able to return false when context not exists', () => {
    const hasContext = requestContext.hasContext();
    expect(hasContext).toBeFalsy();
  });

  it('should be able to return true context exists', () => {
    requestContext.setContext(requestContextParams, () => {
      const hasContext = requestContext.hasContext();
      expect(hasContext).toBeTruthy();
    });
  });
});
