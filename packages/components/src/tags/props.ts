import type { SpaceProps, TagProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'

export const proTagsProps = {
  /**
   * 包裹 n-tag 的 space 组件属性
   */
  spaceProps: {
    type: Object as PropType<SpaceProps>,
    default: () => ({}),
  },
  /**
   * 数据源
   * @example
   * ```vue
   * <ProTags :options="['北京','上海']" />
   * ```
   */
  options: {
    type: Array as PropType<Array<TagProps & { label: string }> | Array<string>>,
  },
} as const

export type ProTagsProps = ExtractPublicPropTypes<typeof proTagsProps>
