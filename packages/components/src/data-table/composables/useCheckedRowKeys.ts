import { useVModel } from '@vueuse/core'

export function useCheckedRowKeys(props) {
  const checkedRowKeys = useVModel(
    props,
    'checkedRowKeys',
    undefined,
    { passive: true },
  )

  function setCheckedRowKeys(keys?: Array<string | number>) {

  }

  return {
    checkedRowKeys: computed(() => checkedRowKeys.value),
    setCheckedRowKeys,
  }
}
