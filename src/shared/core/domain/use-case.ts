export interface UseCase<InputDTO = any, OutputDTO = void> {
  process(input: InputDTO): Promise<OutputDTO>;
}
