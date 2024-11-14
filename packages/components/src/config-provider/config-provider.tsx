import type { ConfigProviderProps } from 'naive-ui'
import { omit } from 'lodash-es'
import { NConfigProvider } from 'naive-ui'
import { computed, unref } from 'vue'
import { useThemeOverrides } from './composables/useThemeOverrides'
import { provideGlobalConfig, useInjectGlobalConfig } from './context'
import { proConfigProviderExtendProps, proConfigProviderProps } from './props'
import { shallowMergePropOverrides } from './utils'

export default defineComponent({
  name: 'ProConfigProvider',
  props: proConfigProviderProps,
  setup(props) {
    const {
      valueTypeMap: injectedValueTypeMap,
      propOverrides: injectedPropOverrides,
    } = useInjectGlobalConfig()

    const {
      themeOverrides,
    } = useThemeOverrides(props)

    const valueTypeMap = computed(() => {
      return {
        ...unref(injectedValueTypeMap),
        ...(unref(props.valueTypeMap) ?? {}),
      }
    })

    const propOverrides = computed(() => {
      return shallowMergePropOverrides(
        unref(injectedPropOverrides),
        (unref(props.propOverrides) ?? {}),
      )
    })

    const nConfigProviderProps = computed<ConfigProviderProps>(() => {
      return omit(
        {
          ...props,
          themeOverrides: themeOverrides.value,
        },
        Object.keys(proConfigProviderExtendProps),
      )
    })

    provideGlobalConfig({
      valueTypeMap,
      propOverrides,
    })
    return {
      nConfigProviderProps,
    }
  },
  render() {
    return <NConfigProvider {...this.nConfigProviderProps} v-slots={this.$slots} />
  },
})
