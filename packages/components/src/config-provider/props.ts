import type { ExtractPublicPropTypes, MaybeRef, PropType } from 'vue'
import { configProviderProps } from 'naive-ui'

export const proConfigProviderExtendProps = {
  /**
   * 覆盖组件 props
   */
  propOverrides: Object as PropType<MaybeRef<Record<string, object>>>,
} as const

export const proConfigProviderProps = {
  ...configProviderProps,
  ...proConfigProviderExtendProps,
} as const

export type ProConfigProviderProps = ExtractPublicPropTypes<typeof proConfigProviderProps>
export type ProConfigProviderExtendProps = ExtractPublicPropTypes<typeof proConfigProviderExtendProps>
