import type { ConfigProviderProps } from 'naive-ui'
import type { WrappedIn } from './context'
import { isFunction, isString } from 'lodash-es'
import { NConfigProvider } from 'naive-ui'
import { computed, defineComponent, unref } from 'vue'
import { useOmitProps } from '../composables'
import { provideGlobalConfig, useInjectGlobalConfig } from './context'
import { proConfigProviderExtendProps, proConfigProviderProps } from './props'
import { shallowMergePropOverrides } from './utils'

export default defineComponent({
  name: 'ProConfigProvider',
  props: proConfigProviderProps,
  setup(props) {
    const {
      mergedEmpty: inheritedEmpty,
      mergedPropOverrides: inheritedPropOverrides,
      mergedPlainComponentValueTransform: inheritedPlainComponentValueTransform,
    } = useInjectGlobalConfig()

    const nConfigProviderProps = useOmitProps(
      props,
      proConfigProviderExtendProps,
    )

    const mergedPropOverrides = computed(() => {
      return shallowMergePropOverrides(
        unref(inheritedPropOverrides),
        (unref(props.propOverrides) ?? {}),
      )
    })

    function mergedEmpty(wrappedIn: WrappedIn) {
      const { empty } = props
      if (isString(empty)) {
        return empty
      }
      if (isFunction(empty)) {
        return empty(wrappedIn)
      }
      return inheritedEmpty(wrappedIn)
    }

    provideGlobalConfig({
      mergedEmpty,
      mergedPropOverrides,
      mergedPlainComponentValueTransform: {
        ...inheritedPlainComponentValueTransform,
        ...props.plainComponentValueTransform,
      },
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
