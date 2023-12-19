import { randomUUID } from 'crypto';
import { BaseEntityProps, CreateEntityProps } from './types';

export abstract class Entity<EntityProps> {
  private readonly id: string;
  private props: EntityProps;
  private readonly createdAt: Date;
  private updatedAt: Date;

  protected constructor({
    id,
    createdAt,
    updatedAt,
    props,
  }: CreateEntityProps<EntityProps>) {
    this.id = id ?? randomUUID();
    this.props = props;
    const now = new Date();
    this.createdAt = createdAt ?? now;
    this.updatedAt = updatedAt ?? now;
    this.validate();
  }

  protected abstract validate(): void;

  public getProps(): EntityProps & BaseEntityProps {
    return Object.freeze({
      id: this.id,
      ...this.props,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  protected updateProps(props: Partial<EntityProps>): void {
    this.props = {
      ...this.props,
      ...props,
    };
    this.updatedAt = new Date();
  }
}
