<script lang='tsx'>
import { computed, defineComponent } from 'vue'
import { NConfigProvider } from 'naive-ui'
import { provideRequestTipConfigContext } from 'pro-components-hooks'
import { useOmitProps } from '../hooks'
import { proConfigProviderExtendProps, proConfigProviderProps } from './props'
import { provideGlobalConfig, useInjectGlobalConfig } from './context'
import { builtInPlaceholder } from './templates/placeholders'
import { builtInRequiredMessage } from './templates/messages'
import { builtInReadonlyRenderers } from './renderers/readonly'

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
        ...parentProForm,
        ...proForm,
        placeholder: {
          ...builtInPlaceholder,
          ...(parentProForm.placeholder ?? {}),
          ...(proForm.placeholder ?? {}),
        },
        requiredMessage: {
          ...builtInRequiredMessage,
          ...(parentProForm.requiredMessage ?? {}),
          ...(proForm.requiredMessage ?? {}),
        },
        readonlyRenderers: {
          ...builtInReadonlyRenderers,
          ...(parentProForm.readonlyRenderers ?? {}),
          ...(proForm.readonlyRenderers ?? {}),
        },
        readonlyEmptyRenderers: {
          ...(parentProForm.readonlyEmptyRenderers ?? {}),
          ...(proForm.readonlyEmptyRenderers ?? {}),
        },
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
