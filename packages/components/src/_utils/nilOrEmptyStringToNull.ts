export function nilOrEmptyStringToNull(value: any) {
  value = value ?? null
  return value === '' ? null : value
}
