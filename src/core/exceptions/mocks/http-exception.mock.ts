import { ArgumentsHost } from '@nestjs/common';
import { vi } from 'vitest';

export const mockGetRequest = vi.fn().mockImplementation(() => ({
  url: '/',
}));

export const mockSend = vi.fn();

export const mockStatus = vi.fn().mockImplementation(() => ({
  send: mockSend,
}));

export const mockGetResponse = vi.fn().mockImplementation(() => ({
  status: mockStatus,
}));

export const mockHttpArgumentsHost = vi.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: mockGetRequest,
}));

export const argumentsHost: ArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: vi.fn(),
  getArgs: vi.fn(),
  getType: vi.fn(),
  switchToRpc: vi.fn(),
  switchToWs: vi.fn(),
};
