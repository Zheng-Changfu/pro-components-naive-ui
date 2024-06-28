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
    const nConfigProviderProps = useOmitProps(props, proConfigProviderExtendProps)

    const {
      proDate = {},
      proForm = {},
      proTime = {},
      proTable = {},
      proButton = {},
      proUpload = {},
      proRequest = {},
      proDateYear = {},
      proDateWeek = {},
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
      proDateWeek: parentProDateWeek,
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
        valueFormat: 'yyyy-MM-DD',
        valueFormatIfShowTime: 'yyyy-MM-DD HH:mm:ss',
        ...parentProDate,
        ...proDate,
      },
      proTime: {
        valueFormat: 'HH:mm:ss',
        ...parentProTime,
        ...proTime,
      },
      proDateYear: {
        valueFormat: 'yyyy',
        ...parentProDateYear,
        ...proDateYear,
      },
      proDateWeek: {
        valueFormat: 'yyyy-w',
        ...parentProDateWeek,
        ...proDateWeek,
      },
      proDateMonth: {
        valueFormat: 'yyyy-MM',
        ...parentProDateMonth,
        ...proDateMonth,
      },
      proDateRange: {
        valueFormat: 'yyyy-MM-DD',
        valueFormatIfShowTime: 'yyyy-MM-DD HH:mm:ss',
        ...parentProDateRange,
        ...proDateRange,
      },
      proDateQuarter: {
        valueFormat: 'yyyy-[Q]Q',
        ...parentProDateQuarter,
        ...proDateQuarter,
      },
      proDateYearRange: {
        valueFormat: 'yyyy',
        ...parentProDateYearRange,
        ...proDateYearRange,
      },
      proDateMonthRange: {
        valueFormat: 'yyyy-MM',
        ...parentProDateMonthRange,
        ...proDateMonthRange,
      },
      proDateQuarterRange: {
        valueFormat: 'yyyy-[Q]Q',
        ...parentProDateQuarterRange,
        ...proDateQuarterRange,
      },
    })
    return {
      nConfigProviderProps,
    }
  },
  render() {
    const {
      $slots,
      nConfigProviderProps,
    } = this
    return <NConfigProvider {...nConfigProviderProps} v-slots={$slots}></NConfigProvider>
  },
})
</script>
