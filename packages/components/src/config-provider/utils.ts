export function shallowMergePropOverrides<T extends Record<string, object>>(o1: T, o2: T): T {
  const beMergedObj = { ...o1 }
  for (const key in o2) {
    if (key in beMergedObj) {
      beMergedObj[key] = {
        ...beMergedObj[key],
        ...o2[key],
      }
    }
    else {
      beMergedObj[key] = o2[key]
    }
  }
  return beMergedObj as T
}
