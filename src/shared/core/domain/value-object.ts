export abstract class ValueObject<Props> {
  private _value: Props;

  public get value(): Props {
    return Object.freeze(this._value);
  }

  constructor(value: Props) {
    this._value = value;
  }

  protected changeValue(value: Props): void {
    this._value = value;
  }
}
