import type { Component, ExtractPublicPropTypes, MaybeRef, PropType } from 'vue'
import type { ProFieldColumnValueType } from '../form'
import { configProviderProps } from 'naive-ui'

export const proConfigProviderExtendProps = {
  /**
   * 覆盖组件 props
   */
  propOverrides: Object as PropType<MaybeRef<Record<string, object>>>,
  /**
   * valueType 映射的组件
   */
  valueTypeMap: Object as PropType<MaybeRef<Partial<Record<ProFieldColumnValueType, Component>>>>,
  /**
   * 主题颜色
   */
  primaryColor: {
    type: String as PropType<`#${string}`>,
  },
} as const

export const proConfigProviderProps = {
  ...configProviderProps,
  ...proConfigProviderExtendProps,
} as const

export type ProConfigProviderProps = ExtractPublicPropTypes<typeof proConfigProviderProps>
export type ProConfigProviderExtendProps = ExtractPublicPropTypes<typeof proConfigProviderExtendProps>
