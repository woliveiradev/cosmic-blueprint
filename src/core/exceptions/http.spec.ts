import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { HttpExceptionHandler } from './http.exception';
import { argumentsHost, mockSend } from './mocks/http-exception.mock';

describe('Http Exception Handler', () => {
  let httpExceptionHandler: HttpExceptionHandler;

  beforeEach(async () => {
    vi.useFakeTimers();
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpExceptionHandler],
    }).compile();
    httpExceptionHandler =
      module.get<HttpExceptionHandler>(HttpExceptionHandler);
  });

  it('should be able to return a http exception', () => {
    const exception = new HttpException('Test Error', HttpStatus.NOT_FOUND);
    httpExceptionHandler.catch(exception, argumentsHost);
    expect(mockSend).toHaveBeenCalledWith({
      request_id: null,
      code: exception.name,
      message: exception.message,
      route: '/',
      timestamp: new Date().toISOString(),
    });
  });
});
