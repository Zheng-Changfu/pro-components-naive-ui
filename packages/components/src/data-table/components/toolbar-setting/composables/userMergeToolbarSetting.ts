import { computed } from 'vue'
import { useInjectProDataTableConfig } from '../../../context'

export function useMergeToolbarSetting() {
  const {
    toolbarSetting,
  } = useInjectProDataTableConfig()

  const mergedDensity = computed(() => {
    const setting = toolbarSetting.value
    if (setting === false || setting.density === false) {
      return false
    }
    return {
      default: 'medium',
      ...setting.density ?? {},
    }
  })

  const mergedColumnSetting = computed(() => {
    const setting = toolbarSetting.value
    if (setting === false || setting.columnSetting === false) {
      return false
    }
    return {
      draggable: true,
      checkable: true,
      resetButton: true,
      indexColummn: true,
      ...setting.columnSetting,
    }
  })

  return {
    mergedDensity,
    mergedColumnSetting,
    showDensity: computed(() => mergedDensity.value !== false),
    showColumnSetting: computed(() => mergedColumnSetting.value !== false),
  }
}
