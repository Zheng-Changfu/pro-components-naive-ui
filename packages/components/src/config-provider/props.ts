import type { ExtractPublicPropTypes, MaybeRef, PropType, VNodeChild } from 'vue'
import type { WrappedIn } from './context'
import { configProviderProps } from 'naive-ui'

export const proConfigProviderExtendProps = {
  /**
   * 覆盖组件 props
   */
  propOverrides: Object as PropType<MaybeRef<Record<string, object>>>,
  /**
   * 当内容为空时显示的内容（支持所有的表单项以及 plain-components）
   * 当为函数时接收一个参数 wrappedIn，代表了当前组件被包裹在哪个组件中
   * @default '-'
   */
  empty: [String, Function] as PropType<string | ((wrappedIn: WrappedIn) => VNodeChild)>,
} as const

export const proConfigProviderProps = {
  ...configProviderProps,
  ...proConfigProviderExtendProps,
} as const

export type ProConfigProviderProps = ExtractPublicPropTypes<typeof proConfigProviderProps>
export type ProConfigProviderExtendProps = ExtractPublicPropTypes<typeof proConfigProviderExtendProps>
