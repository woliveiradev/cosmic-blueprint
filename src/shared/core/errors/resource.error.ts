import { Random } from 'shared/utils';

export class ResourceError<ErrorMessage = string> {
  public readonly id: string;
  public name: string;
  public readonly message: ErrorMessage;
  public readonly timestamp: number;

  constructor(message: ErrorMessage) {
    this.id = Random.uniqueId();
    this.message = message;
    this.timestamp = Date.now();
  }
}
