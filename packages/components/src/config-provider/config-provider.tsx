import { computed, unref } from 'vue'
import type { ConfigProviderProps } from 'naive-ui'
import { NConfigProvider } from 'naive-ui'
import { merge, omit } from 'lodash-es'
import { proConfigProviderExtendProps, proConfigProviderProps } from './props'
import { provideGlobalConfig, useInjectGlobalConfig } from './context'

export default defineComponent({
  name: 'ProConfigProvider',
  props: proConfigProviderProps,
  setup(props) {
    const {
      proForm = {},
      proTable = {},
      proButton = {},
    } = props

    const {
      proForm: parentProForm,
      proTable: parentProTable,
      proButton: parentProButton,
      valueTypeMap: parentValueTypeMap,
      presetFieldProps: parentPresetFieldProps,
    } = useInjectGlobalConfig()

    const valueTypeMap = computed(() => {
      return {
        ...unref(parentValueTypeMap),
        ...(unref(props.valueTypeMap) ?? {}),
      }
    })

    const presetFieldPropsRecord = computed(() => {
      return {
        ...unref(parentPresetFieldProps),
        ...(unref(props.presetFieldProps) ?? {}),
      }
    })

    const nConfigProviderProps = computed<ConfigProviderProps>(() => {
      return omit(
        {
          ...props,
          themeOverrides: merge(
            {
              Card: {
                borderRadius: '8px',
              },
            },
            props.themeOverrides ?? {},
          ),
        },
        Object.keys(proConfigProviderExtendProps),
      )
    })

    provideGlobalConfig({
      proForm: {
        validateTrigger: 'input',
        ...parentProForm,
        ...proForm,
      },
      proTable: {
        ...parentProTable,
        ...proTable,
      },
      proButton: {
        ...parentProButton,
        ...proButton,
        authData: computed(() => {
          const propAuthData = props.proButton?.authData
          const parentAuthData = parentProButton.authData?.value
          return propAuthData ?? parentAuthData
        }),
      },
      valueTypeMap,
      presetFieldProps: presetFieldPropsRecord,
    })

    return {
      nConfigProviderProps,
    }
  },
  render() {
    return <NConfigProvider {...this.nConfigProviderProps} v-slots={this.$slots} />
  },
})
