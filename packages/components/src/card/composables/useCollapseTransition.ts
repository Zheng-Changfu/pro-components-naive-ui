import type { CollapseTransitionProps } from 'naive-ui'
import type { ProCardProps } from '../props'
import { watchEffect } from 'vue'

export function useCollapseTransition(props: ComputedRef<ProCardProps>) {
  const show = ref(true)

  function doUpdateShow(val: boolean) {
    show.value = val
  }

  const nCollapseTransitionProps = computed<CollapseTransitionProps>(() => {
    return {
      show: show.value,
      appear: props.value.appear,
    }
  })

  watchEffect(() => {
    const value = props.value.show
    show.value = value ?? true
  })

  return {
    show,
    doUpdateShow,
    nCollapseTransitionProps,
  }
}
