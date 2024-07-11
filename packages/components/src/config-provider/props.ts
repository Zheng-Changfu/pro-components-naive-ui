import type { ExtractPublicPropTypes, PropType } from 'vue'
import { configProviderProps } from 'naive-ui'
import type { GlobalConfigProButton, GlobalConfigProDate, GlobalConfigProDateMonth, GlobalConfigProDateMonthRange, GlobalConfigProDateQuarter, GlobalConfigProDateQuarterRange, GlobalConfigProDateRange, GlobalConfigProDateWeek, GlobalConfigProDateYear, GlobalConfigProDateYearRange, GlobalConfigProForm, GlobalConfigProRequest, GlobalConfigProTable, GlobalConfigProTime, GlobalConfigProUpload } from './types'

export const proConfigProviderExtendProps = {
  proDate: Object as PropType<Partial<GlobalConfigProDate>>,
  proTime: Object as PropType<Partial<GlobalConfigProTime>>,
  proForm: Object as PropType<Partial<GlobalConfigProForm>>,
  proTable: Object as PropType<Partial<GlobalConfigProTable>>,
  proButton: Object as PropType<Partial<GlobalConfigProButton>>,
  proUpload: Object as PropType<Partial<GlobalConfigProUpload>>,
  proRequest: Object as PropType<Partial<GlobalConfigProRequest>>,
  proDateYear: Object as PropType<Partial<GlobalConfigProDateYear>>,
  proDateWeek: Object as PropType<Partial<GlobalConfigProDateWeek>>,
  proDateMonth: Object as PropType<Partial<GlobalConfigProDateMonth>>,
  proDateRange: Object as PropType<Partial<GlobalConfigProDateRange>>,
  proDateQuarter: Object as PropType<Partial<GlobalConfigProDateQuarter>>,
  proDateYearRange: Object as PropType<Partial<GlobalConfigProDateYearRange>>,
  proDateMonthRange: Object as PropType<Partial<GlobalConfigProDateMonthRange>>,
  proDateQuarterRange: Object as PropType<Partial<GlobalConfigProDateQuarterRange>>,
} as const

export const proConfigProviderProps = {
  ...configProviderProps,
  ...proConfigProviderExtendProps,
} as const

export type ProConfigProviderProps = ExtractPublicPropTypes<typeof proConfigProviderProps>
export type ProConfigProviderExtendProps = ExtractPublicPropTypes<typeof proConfigProviderExtendProps>
