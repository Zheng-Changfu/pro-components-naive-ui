import type { CNode } from 'css-render'
import { useSsrAdapter } from '@css-render/vue3-ssr'
import { inject, onBeforeMount } from 'vue'

export function useMountStyle(
  resolveId: string,
  mountId: string,
  style: CNode | undefined,
) {
  const ssrAdapter = useSsrAdapter()
  const cssrAnchorMetaName = 'naive-ui-style'
  const NConfigProvider = inject<any>('n-config-provider', null)
  if (style) {
    const mountStyle = (): void => {
      style.mount({
        id: mountId,
        head: true,
        anchorMetaName: cssrAnchorMetaName,
        ssr: ssrAdapter,
        parent: NConfigProvider?.styleMountTarget,
      })
    }
    if (ssrAdapter) {
      mountStyle()
    }
    else {
      onBeforeMount(mountStyle)
    }
  }

  return computed(() => {
    return NConfigProvider?.mergedThemeOverridesRef.value?.[resolveId] ?? {}
  })
}
