import { useVModel } from '@vueuse/core'

export function useExpanedRowKeys(props) {
  const expanedRowKeys = useVModel(
    props,
    'expandedRowKeys',
    undefined,
    { passive: true },
  )

  function expandAll() {

  }

  function setExpandedRowKeys(keys?: Array<string | number>) {

  }

  return {
    expanedRowKeys: computed(() => expanedRowKeys.value),
    setExpandedRowKeys,
  }
}
