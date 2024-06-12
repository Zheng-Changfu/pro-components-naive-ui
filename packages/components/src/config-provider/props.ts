import type { ExtractPublicPropTypes, PropType } from 'vue'
import { configProviderProps } from 'naive-ui'
import type { GlobalConfigProButton, GlobalConfigProForm, GlobalConfigProRequest, GlobalConfigProTable, GlobalConfigProUpload } from './types'

export const proConfigProviderExtendProps = {
  proForm: Object as PropType<Partial<GlobalConfigProForm>>,
  proTable: Object as PropType<Partial<GlobalConfigProTable>>,
  proButton: Object as PropType<Partial<GlobalConfigProButton>>,
  proUpload: Object as PropType<Partial<GlobalConfigProUpload>>,
  proRequest: Object as PropType<Partial<GlobalConfigProRequest>>,
} as const

export const proConfigProviderProps = {
  ...configProviderProps,
  ...proConfigProviderExtendProps,
} as const

export type ProConfigProviderProps = ExtractPublicPropTypes<typeof proConfigProviderProps>
export type ProConfigProviderExtendProps = ExtractPublicPropTypes<typeof proConfigProviderExtendProps>
