import type { ExtractPublicPropTypes, PropType } from 'vue'
import { configProviderProps } from 'naive-ui'
import type { GlobalConfigProButton, GlobalConfigProForm, GlobalConfigProFormList, GlobalConfigProRequest, GlobalConfigProTable, GlobalConfigProUpload } from './types'

/**
 * 表单
 *  动画
 *  插槽
 *  readonly
 *  vShow -> vIf
 *  是否需要 n-form-item
 *  请求 & convertValue
 *  expressionContext
 */
export const proConfigProviderExtendProps = {
  proForm: Object as PropType<Partial<GlobalConfigProForm>>,
  proTable: Object as PropType<Partial<GlobalConfigProTable>>,
  proButton: Object as PropType<Partial<GlobalConfigProButton>>,
  proUpload: Object as PropType<Partial<GlobalConfigProUpload>>,
  proRequest: Object as PropType<Partial<GlobalConfigProRequest>>,
  proFormList: Object as PropType<Partial<GlobalConfigProFormList>>,
} as const

export const proConfigProviderProps = {
  ...configProviderProps,
  ...proConfigProviderExtendProps,
} as const

export type ProConfigProviderProps = ExtractPublicPropTypes<typeof proConfigProviderProps>
export type ProConfigProviderExtendProps = ExtractPublicPropTypes<typeof proConfigProviderExtendProps>
