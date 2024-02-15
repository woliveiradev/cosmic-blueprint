export interface DomainService<InputDTO = any, OutputDTO = void> {
  make(input: InputDTO): Promise<OutputDTO>;
}
