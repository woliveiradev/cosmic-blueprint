import { Random } from 'shared/utils';

export class UniqueEntityId {
  private readonly id: string;

  public get value(): string {
    return this.id;
  }

  constructor(id?: string) {
    this.id = id ?? Random.uniqueId();
  }

  public equals(id: UniqueEntityId): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return this.value === id.value;
  }
}
