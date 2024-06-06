import type { ExtractPublicPropTypes, PropType } from 'vue'
import { omit } from 'lodash-es'
import { formProps } from 'naive-ui'
import type { ArrayField, BaseField } from 'pro-components-hooks'

export const proFormProps = {
  /**
   * 继承原来的属性
   * 剔除 model, 表单值内部管理
   * 剔除 rules, 校验规则内部自动生成或在 pro-form-item 上书写
   */
  ...omit(formProps, ['model', 'rules']),
  /**
   * 表单初始值
   */
  initialValues: {
    type: Object,
    default: () => ({}),
  },
  /**
   * 表单内的表达式上下文
   */
  expressionContext: {
    type: Object,
    default: () => ({}),
  },
  /**
   * 字段值发生变化时触发的回调函数
   */
  onFieldValueChange: {
    type: Function as PropType<(opt: {
      field: BaseField | ArrayField
      value: any
    }) => void>,
  },
  /**
   * 依赖项的值发生变化时触发的回调函数
   */
  onDependenciesValueChange: {
    type: Function as PropType<(opt: {
      path: string
      value: any
    }) => void>,
  },
}

export type ProFormProps = ExtractPublicPropTypes<typeof proFormProps>
