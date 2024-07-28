import type { FormItemGiProps } from 'naive-ui'
import type { VNodeChild } from 'vue'

export interface ProFieldSlots {
  /**
   * 表单组件的后缀插槽
   */
  'addon-after': any
  /**
   * 表单组件的前缀插槽
   */
  'addon-before': any
  /**
   * 表单组件只读模式下的内容，优先级比 renderReadonly 高
   */
  'readonly': { fieldProps: Record<string, any> }
  /**
   * 自定义表单组件，优先级比 fieldRender 高
   */
  'field': {
    bindProps: Record<string, any>
    bindSlots: Record<string, any>
  }
  /**
   * 自定义 NFormItem/NFormItemGi，优先级比 formItemRender 高
   */
  'form-item': {
    bindProps: FormItemGiProps
    bindSlots: Record<string, any>
  }
  /**
   * 自定义渲染(表单+前后缀插槽)容器，优先级比 groupRender 高
   */
  'group': { vnode: VNodeChild }
  [x: string]: any
}
