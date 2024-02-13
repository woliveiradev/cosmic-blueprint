import { randomUUID } from 'crypto';

export class Random {
  public static uniqueId(): string {
    return randomUUID();
  }
}
