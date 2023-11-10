export interface UseCase<InputDTO = any, OutputDTO = void> {
  run(input: InputDTO): Promise<OutputDTO>;
}
