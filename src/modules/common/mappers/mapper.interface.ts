export default interface MapperInterface<Input, Output> {

    toEntity(input: Input): Output;
}
