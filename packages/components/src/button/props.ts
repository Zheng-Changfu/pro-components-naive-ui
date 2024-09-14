import type { ExtractPublicPropTypes } from 'naive-ui/es/_utils'
import type { PropType } from 'vue'
import { buttonProps } from 'naive-ui'

export const proButtonExtendProps = {
  /**
   * 是否自动检测异步函数开启 loading
   * @default true
   */
  autoLoading: {
    type: Boolean,
    default: true,
  },
  /**
   * 提示文字
   * @example
   * ```vue
   * <ProButton tooltip="xxxx"></ProButton> // 单行
   * <ProButton :tooltip="['xxxx','xxxx']"></ProButton> // 多行
   * ```
   */
  tooltip: {
    type: [String, Array] as PropType<string | string[]>,
  },
  /**
   * 按钮禁用时的 tooltip，优先级高于 tooltip
   */
  disabledTooltip: {
    type: [String, Array] as PropType<string | string[]>,
  },
  /**
   * 权限编码，可以是任意数据，配合 ProConfigProvider 使用
   */
  auth: {
    type: undefined as any as PropType<any>,
    default: undefined,
  },
  /**
   * 按钮文本
   */
  content: String,
} as const

export const proButtonProps = {
  ...buttonProps,
  ...proButtonExtendProps,
} as const

export type ProButtonProps = ExtractPublicPropTypes<typeof proButtonProps>
export type ProButtonExtendProps = ExtractPublicPropTypes<typeof proButtonExtendProps>
