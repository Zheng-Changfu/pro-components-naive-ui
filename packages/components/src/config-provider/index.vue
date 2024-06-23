<script lang='tsx'>
import { computed, defineComponent } from 'vue'
import { NConfigProvider } from 'naive-ui'
import { toString } from 'lodash-es'
import { provideRequestTipConfigContext } from 'pro-components-hooks'
import { useOmitProps } from '../hooks'
import { proConfigProviderExtendProps, proConfigProviderProps } from './props'
import { provideGlobalConfigContext, useInjectGlobalConfigContext } from './context'
import type { ProComponentGlobalConfig } from './types'

export default defineComponent({
  name: 'ProConfigProvider',
  props: proConfigProviderProps,
  setup(props) {
    const configProviderProps = useOmitProps(props, proConfigProviderExtendProps)

    const {
      proDate = {},
      proForm = {},
      proTime = {},
      proTable = {},
      proButton = {},
      proUpload = {},
      proRequest = {},
      proDateYear = {},
      proDateMonth = {},
      proDateRange = {},
      proDateQuarter = {},
      proDateYearRange = {},
      proDateMonthRange = {},
      proDateQuarterRange = {},
    } = props

    function builtInPlaceholderRender(options: ProComponentGlobalConfig) {
      const { type, formItemProps } = options
      const { label } = formItemProps
      switch (type) {
        case 'ProInput':
          return `请输入${toString(label?.value)}`
      }
    }

    function builtInValidateMessageRender(options: ProComponentGlobalConfig) {
      const { formItemProps } = options
      const { label } = formItemProps
      return `${toString(label?.value)}为必填字段`
    }

    /**
     * 可能会嵌套，自己取不到，取上层的
     */
    const {
      proTime: parentProTime,
      proDate: parentProDate,
      proForm: parentProForm,
      proTable: parentProTable,
      proButton: parentProButton,
      proUpload: parentProUpload,
      proRequest: parentProRequest,
      proDateYear: parentProDateYear,
      proDateMonth: parentProDateMonth,
      proDateRange: parentProDateRange,
      proDateQuarter: parentProDateQuarter,
      proDateYearRange: parentProDateYearRange,
      proDateMonthRange: parentProDateMonthRange,
      proDateQuarterRange: parentProDateQuarterRange,
    } = useInjectGlobalConfigContext()

    provideRequestTipConfigContext(proRequest)
    provideGlobalConfigContext({
      proForm: {
        validateTrigger: 'input',
        placeholderRender: builtInPlaceholderRender,
        validateMessageRender: builtInValidateMessageRender,
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
      proUpload: {
        ...parentProUpload,
        ...proUpload,
      },
      proRequest: {
        ...parentProRequest,
        ...proRequest,
      },
      proDate: {
        valueFormat: 'YYYY-MM-DD',
        valueFormatIfShowTime: 'YYYY-MM-DD HH:mm:ss',
        ...parentProDate,
        ...proDate,
      },
      proTime: {
        valueFormat: 'HH:mm:ss',
        ...parentProTime,
        ...proTime,
      },
      proDateYear: {
        valueFormat: 'YYYY',
        ...parentProDateYear,
        ...proDateYear,
      },
      proDateMonth: {
        valueFormat: 'YYYY-MM',
        ...parentProDateMonth,
        ...proDateMonth,
      },
      proDateRange: {
        valueFormat: 'YYYY-MM-DD',
        valueFormatIfShowTime: 'YYYY-MM-DD HH:mm:ss',
        ...parentProDateRange,
        ...proDateRange,
      },
      proDateQuarter: {
        valueFormat: 'YYYY-[Q]Q',
        ...parentProDateQuarter,
        ...proDateQuarter,
      },
      proDateYearRange: {
        valueFormat: 'YYYY',
        ...parentProDateYearRange,
        ...proDateYearRange,
      },
      proDateMonthRange: {
        valueFormat: 'YYYY-MM',
        ...parentProDateMonthRange,
        ...proDateMonthRange,
      },
      proDateQuarterRange: {
        valueFormat: 'YYYY-[Q]Q',
        ...parentProDateQuarterRange,
        ...proDateQuarterRange,
      },
    })
    return {
      configProviderProps,
    }
  },
  render() {
    const {
      $slots,
      configProviderProps,
    } = this
    return <NConfigProvider {...configProviderProps} v-slots={$slots}></NConfigProvider>
  },
})
</script>
