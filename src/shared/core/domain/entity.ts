import { Random } from 'shared/utils';

export type BaseEntityProps = {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateEntity<Props> = Props & BaseEntityProps;

type EntityProps<Props> = Omit<Props, keyof BaseEntityProps>;

export abstract class Entity<CustomProps> {
  private readonly _id: string;
  private props: EntityProps<CustomProps>;
  public readonly createdAt: Date;
  private _updatedAt?: Date;

  protected constructor({
    id,
    createdAt,
    updatedAt,
    ...props
  }: CreateEntity<CustomProps>) {
    this._id = id ?? Random.uniqueId();
    this.props = props;
    this.createdAt = createdAt ?? new Date();
    this._updatedAt = updatedAt ?? undefined;
  }

  public get id(): string {
    return this._id;
  }

  protected get _props(): EntityProps<CustomProps> {
    return Object.freeze(this.props);
  }

  public get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  protected updateProps(props: Partial<CustomProps>): void {
    this.props = {
      ...this.props,
      ...props,
    };
    this._updatedAt = new Date();
  }
}
