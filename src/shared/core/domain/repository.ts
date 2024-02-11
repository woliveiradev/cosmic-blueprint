import { AggregateRoot } from './aggregate-root';

export interface StoreRepository<Aggregate extends AggregateRoot<unknown>> {
  store(aggregateRoot: Aggregate): Promise<void>;
}

export interface GetByIdRepository<Aggregate extends AggregateRoot<unknown>> {
  getById(aggregateId: string): Promise<Aggregate | undefined>;
}

export interface UpdateRepository<Aggregate extends AggregateRoot<unknown>> {
  update(aggregateRoot: Aggregate): Promise<void>;
}

export interface RemoveRepository {
  remove(aggregateId: string): Promise<void>;
}
