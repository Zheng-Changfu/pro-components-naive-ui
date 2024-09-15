import type { CollapseTransitionProps } from 'naive-ui'
import type { ProCardProps } from '../props'
import { watchImmediate } from '@vueuse/core'

export function useCollapseTransition(props: ComputedRef<ProCardProps>) {
  const show = ref(true)

  watchImmediate(
    () => props.value.show,
    v => show.value = v ?? true,
  )

  function doUpdateShow(val: boolean) {
    show.value = val
  }

  const nCollapseTransitionProps = computed<CollapseTransitionProps>(() => {
    return {
      show: show.value,
      appear: props.value.appear,
    }
  })

  return {
    show,
    doUpdateShow,
    nCollapseTransitionProps,
  }
}
