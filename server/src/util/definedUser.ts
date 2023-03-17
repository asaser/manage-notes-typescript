export function assertsDefinedUser<T>(param: T): asserts param is NonNullable<T> {
    if(!param) {
        throw Error("Parameter should be defined")
    }
}