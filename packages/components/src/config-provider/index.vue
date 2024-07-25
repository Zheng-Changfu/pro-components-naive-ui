<script lang='tsx'>
import { computed, defineComponent } from 'vue'
import { NConfigProvider } from 'naive-ui'
import { toString } from 'lodash-es'
import { provideRequestTipConfigContext } from 'pro-components-hooks'
import type { FormValidateMessages } from 'naive-ui/es/form/src/interface'
import { useOmitProps } from '../hooks'
import { proConfigProviderExtendProps, proConfigProviderProps } from './props'
import { provideGlobalConfig, useInjectGlobalConfig } from './context'
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

    function builtInRenderPlaceholder(options: ProFieldGlobalConfig): string | [string, string] {
      const { name, nFormItemMeta } = options
      const { label } = nFormItemMeta.value

      switch (name) {
        case 'ProDate':
        case 'ProDateYear':
        case 'ProDateTime':
        case 'ProDateWeek':
        case 'ProDateMonth':
        case 'ProDateQuarter':
        case 'ProSelect':
        case 'ProTreeSelect':
          return `请选择${toString(label)}`
        case 'ProDateRange':
          return ['开始日期', '结束日期']
        case 'ProDateYearRange':
          return ['开始年份', '结束年份']
        case 'ProDateMonthRange':
          return ['开始月份', '结束月份']
        case 'ProDateQuarterRange':
          return ['开始季度', '结束季度']
        case 'ProTransfer':
          return ['请输入', '请输入']
        default:
          return `请输入${toString(label)}`
      }
    }

    // function builtInGetValidateMessages(options: ProFieldGlobalConfig): FormValidateMessages {
    //   const { nFormItemMeta } = options
    //   const { label, path } = nFormItemMeta.value
    //   const sLabel = toString(label)
    //   return {
    //     required: () => {
    //       return sLabel
    //         ? `${sLabel}为必填字段`
    //         : `${path}为必填字段`
    //     },
    //   }
    // }

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
    } = useInjectGlobalConfig()

    provideRequestTipConfigContext(proRequest)
    provideGlobalConfig({
      proForm: {
        validateTrigger: 'input',
        renderPlaceholder: builtInRenderPlaceholder,
        // getValidateMessages: builtInGetValidateMessages,
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
        title: '上传',
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
