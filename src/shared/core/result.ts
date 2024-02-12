import { BaseError } from './errors';

export type Either<L, A> = Error<L, A> | Data<L, A>;

export class Error<L, A> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isFail(): this is Error<L, A> {
    return true;
  }

  isOK(): this is Data<L, A> {
    return false;
  }
}

export class Data<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isFail(): this is Error<L, A> {
    return false;
  }

  isOK(): this is Data<L, A> {
    return true;
  }
}

export class Result {
  public static ok<Data>(value: Data): Either<never, Data> {
    return new Data(value);
  }

  public static fail<Error extends BaseError>(
    error: Error,
  ): Either<Error, never> {
    return new Error(error);
  }

  public static void(): Either<never, void> {
    return new Data(undefined);
  }
}
