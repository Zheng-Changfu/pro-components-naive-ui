export function def(obj: object, key: string | symbol, value: any, writable = false): void {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value,
  })
}
