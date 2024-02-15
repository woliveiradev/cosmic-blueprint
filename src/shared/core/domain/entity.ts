import { UniqueEntityId } from './unique-entity-id';

export type BaseEntityProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateEntity<Props> = Props & BaseEntityProps;

type EntityProps<Props> = Omit<Props, keyof BaseEntityProps>;

export abstract class Entity<CustomProps> {
  private readonly _id: UniqueEntityId;
  private props: EntityProps<CustomProps>;
  public readonly createdAt: Date;
  private _updatedAt?: Date;

  public get id(): UniqueEntityId {
    return this._id;
  }

  protected get _props(): EntityProps<CustomProps> {
    return Object.freeze(this.props);
  }

  public get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  protected constructor({
    id,
    createdAt,
    updatedAt,
    ...props
  }: CreateEntity<CustomProps>) {
    this._id = new UniqueEntityId(id);
    this.props = props;
    this.createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? undefined;
  }

  public equals(entity: Entity<CustomProps>): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }
    if (!(entity instanceof Entity)) {
      return false;
    }
    if (this === entity) {
      return true;
    }
    return this._id.equals(entity.id);
  }

  protected updateProps(props: Partial<CustomProps>): void {
    this.props = {
      ...this.props,
      ...props,
    };
    this._updatedAt = new Date();
  }
}
