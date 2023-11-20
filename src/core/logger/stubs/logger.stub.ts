import { Logger } from '../types';

export class LoggerStub implements Logger {
  public debug(): void {}

  public info(): void {}

  public warn(): void {}

  public error(): void {}
}
