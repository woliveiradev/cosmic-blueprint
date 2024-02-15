import { AggregateRoot } from './aggregate-root';
import { UniqueEntityId } from './unique-entity-id';

export interface Repository<Aggregate extends AggregateRoot<unknown>> {
  store(aggregate: Aggregate): Promise<void>;
  getById(aggregateId: UniqueEntityId): Promise<Aggregate>;
  update(aggregate: Aggregate): Promise<void>;
}
