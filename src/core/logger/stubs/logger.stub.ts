import { Logger } from '../types';

export class LoggerStub implements Logger {
  public debug(): void {
    return;
  }

  public info(): void {
    return;
  }

  public warn(): void {
    return;
  }

  public error(): void {
    return;
  }
}
