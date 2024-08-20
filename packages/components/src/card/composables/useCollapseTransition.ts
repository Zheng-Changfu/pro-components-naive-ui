import type { CollapseTransitionProps } from 'naive-ui'
import type { ProCardProps } from '../props'

export function useCollapseTransition(props: ProCardProps) {
  const show = ref(true)

  watch(
    toRef(props, 'show'),
    v => show.value = v ?? true,
    { immediate: true },
  )

  function doUpdateShow(val: boolean) {
    show.value = val
  }

  const nCollapseTransitionProps = computed<CollapseTransitionProps>(() => {
    return {
      show: show.value,
      appear: props.appear,
    }
  })

  return {
    show,
    doUpdateShow,
    nCollapseTransitionProps,
  }
}
