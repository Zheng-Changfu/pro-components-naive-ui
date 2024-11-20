import type { ConfigProviderProps } from 'naive-ui'
import { NConfigProvider } from 'naive-ui'
import { computed, unref } from 'vue'
import { useOmitProps } from '../composables'
import { provideGlobalConfig, useInjectGlobalConfig } from './context'
import { proConfigProviderExtendProps, proConfigProviderProps } from './props'
import { shallowMergePropOverrides } from './utils'

export default defineComponent({
  name: 'ProConfigProvider',
  props: proConfigProviderProps,
  setup(props) {
    const {
      propOverrides: injectedPropOverrides,
    } = useInjectGlobalConfig()

    const nConfigProviderProps = useOmitProps(
      props,
      proConfigProviderExtendProps,
    )

    const propOverrides = computed(() => {
      return shallowMergePropOverrides(
        unref(injectedPropOverrides),
        (unref(props.propOverrides) ?? {}),
      )
    })

    provideGlobalConfig({
      propOverrides,
    })
    return {
      nConfigProviderProps,
    }
  },
  render() {
    return (
      <NConfigProvider
        {...this.nConfigProviderProps as ConfigProviderProps}
        v-slots={this.$slots}
      />
    )
  },
})
