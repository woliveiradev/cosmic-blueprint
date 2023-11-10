export interface DomainService<Input, Output> {
  execute(input: Input): Promise<Output>;
}
