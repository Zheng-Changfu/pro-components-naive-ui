import type { VNodeChild } from 'vue'
import type { ProDataTableToolbarSetting } from '../../../types'
import { useInjectProDataTableProps } from '../../../context'

type RenderIcon = () => VNodeChild
export type MergedToolbarReload = (ProDataTableToolbarSetting['reload'] & {}) | false
export type MergedToolbarDensity = ((Required<Omit<ProDataTableToolbarSetting['density'] & {}, 'renderIcon'>>) & { renderIcon?: RenderIcon }) | false
export type MergedToolbarColumnSetting = (Required<Omit<ProDataTableToolbarSetting['columnSetting'] & {}, 'renderIcon'>> & { renderIcon: RenderIcon }) | false

export function useMergeToolbarSetting() {
  const proDataTableProps = useInjectProDataTableProps()!

  const mergedToolbarSetting = computed(() => {
    const normlaize = (val: any) => {
      if (val === false) {
        return false
      }
      if (val === undefined) {
        return {}
      }
      return val
    }

    const setting = proDataTableProps.value.toolbarSetting
    const normalizedSetting = normlaize(setting) as ProDataTableToolbarSetting | false
    if (normalizedSetting === false) {
      return false
    }
    return {
      reload: normlaize(normalizedSetting.reload) as MergedToolbarReload,
      density: normlaize(normalizedSetting.density) as MergedToolbarDensity,
      columnSetting: normlaize(normalizedSetting.columnSetting) as MergedToolbarColumnSetting,
    }
  })

  const mergedReload = computed<MergedToolbarReload>(() => {
    const setting = mergedToolbarSetting.value
    if (setting === false || setting.reload === false) {
      return false
    }
    return setting.reload
  })

  const mergedDensity = computed<MergedToolbarDensity>(() => {
    const setting = mergedToolbarSetting.value
    if (setting === false || setting.density === false) {
      return false
    }
    return {
      default: 'medium',
      ...setting.density as any,
    }
  })

  const mergedColumnSetting = computed<MergedToolbarColumnSetting>(() => {
    const setting = mergedToolbarSetting.value
    if (setting === false || setting.columnSetting === false) {
      return false
    }
    return {
      draggable: true,
      checkable: true,
      resetButton: true,
      indexColummn: true,
      ...setting.columnSetting as any,
    }
  })

  return {
    mergedReload,
    mergedDensity,
    mergedColumnSetting,
    showReload: computed(() => mergedReload.value !== false),
    showDensity: computed(() => mergedDensity.value !== false),
    showColumnSetting: computed(() => mergedColumnSetting.value !== false),
  }
}
