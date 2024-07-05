<script lang='tsx'>
import { computed, defineComponent } from 'vue'
import { NConfigProvider } from 'naive-ui'
import { toString } from 'lodash-es'
import { provideRequestTipConfigContext } from 'pro-components-hooks'
import { useOmitProps } from '../hooks'
import { proConfigProviderExtendProps, proConfigProviderProps } from './props'
import { provideGlobalConfigContext, useInjectGlobalConfigContext } from './context'
import type { ProFieldGlobalConfig } from './types'

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

    function builtInPlaceholderRender(options: ProFieldGlobalConfig) {
      const { name, formItemProps } = options
      const { label } = formItemProps.value
      switch (name) {
        case 'ProInput':
        case 'ProTextarea':
        case 'ProPassword':
          return `请输入${toString(label)}`
        case 'ProDate':
          return `请选择${toString(label)}`
      }
    }

    function builtInValidateMessageRender(options: ProFieldGlobalConfig) {
      const { formItemProps } = options
      const { label, path } = formItemProps.value
      const sLabel = toString(label)
      return sLabel
        ? `${sLabel}为必填字段`
        : `${path}为必填字段`
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
      proDateWeek: {
        valueFormat: 'YYYY-w',
        ...parentProDateWeek,
        ...proDateWeek,
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
