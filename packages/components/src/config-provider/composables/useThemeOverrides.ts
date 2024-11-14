import type { GlobalThemeOverrides } from 'naive-ui'
import type { ProConfigProviderProps } from '../props'
import { generate } from '@ant-design/colors'
import { watchImmediate } from '@vueuse/core'

export function useThemeOverrides(props: ProConfigProviderProps) {
  const themeOverrides = ref<GlobalThemeOverrides | null>()

  watchImmediate(
    () => props.themeOverrides,
    (value) => {
      themeOverrides.value = value
    },
  )

  watchImmediate(
    () => [props.primaryColor, props.theme],
    updateTheme,
  )

  function updateTheme() {
    const {
      theme,
      primaryColor,
    } = props

    if (!primaryColor)
      return

    const colors = generate(primaryColor, {
      theme: theme?.name === 'dark' ? 'dark' : 'default',
    })

    themeOverrides.value = {
      ...(themeOverrides.value ?? {}),
      common: {
        ...themeOverrides.value?.common ?? {},
        primaryColor: colors[5],
        primaryColorHover: colors[4],
        primaryColorSuppl: colors[4],
        primaryColorPressed: colors[6],
      },
    }
  }

  return {
    themeOverrides,
  }
}
