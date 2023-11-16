import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HttpExceptionHandler } from './http.exception';
import { argumentsHost, mockSend } from './mocks/http-exception.mock';
import { RequestContextStub } from '../context/stubs/request-context.stub';
import { REQUEST_CONTEXT_TOKEN } from 'core/context/ioc/tokens';

describe('Http Exception Handler', () => {
  let httpExceptionHandler: HttpExceptionHandler;

  beforeEach(async () => {
    vi.useFakeTimers();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpExceptionHandler,
        {
          provide: REQUEST_CONTEXT_TOKEN,
          useClass: RequestContextStub,
        },
      ],
    }).compile();
    httpExceptionHandler =
      module.get<HttpExceptionHandler>(HttpExceptionHandler);
  });

  it('should be able to return a http exception', () => {
    const exception = new HttpException('Test Error', HttpStatus.NOT_FOUND);
    httpExceptionHandler.catch(exception, argumentsHost);
    expect(mockSend).toHaveBeenCalledWith({
      request_id: 'x-request-id',
      code: exception.name,
      message: exception.message,
      route: '/',
      timestamp: new Date().toISOString(),
    });
  });
});
