import { AggregateRoot } from '../core/domain';

export interface ToDomainMapper<Aggregate extends AggregateRoot<unknown>> {
  toDomain(props: any): Aggregate;
}

export interface ToApplicationMapper<Aggregate extends AggregateRoot<unknown>> {
  toApplication(props: any): Aggregate;
}

export interface ToPersistence<Aggregate extends AggregateRoot<unknown>> {
  toPersistence(aggregate: Aggregate): any;
}
