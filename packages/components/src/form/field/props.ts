import type { Dependencie, MaybeExpression } from 'pro-components-hooks'
import type { ExtractPublicPropTypes, PropType } from 'vue'

export const proFieldProps = {
  /**
   * 初始值，优先级大于 Form 组件的 initialValues
   */
  initialValue: {
    type: undefined as any as PropType<any>,
    default: undefined,
  },
  /**
   * 字段被隐藏或删除时是否还保留值
   */
  preserve: {
    type: Boolean,
    default: true,
  },
  /**
   * 表单值，优先级大于 initialValue，支持表达式
   */
  value: {
    type: undefined as any as PropType<any>,
    default: undefined,
  },
  /**
   * 是否显示，支持表达式
   */
  visible: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean | undefined>>,
    default: undefined,
  },
  /**
   * 是否隐藏，支持表达式
   */
  hidden: {
    type: [Boolean, String] as PropType<MaybeExpression<boolean | undefined>>,
    default: undefined,
  },
  /**
   * 字段的依赖项，当依赖项的值发生变化时，会触发校验
   */
  dependencies: {
    type: [Object, Array] as PropType<Dependencie | Dependencie[]>,
  },
  /**
   * 后置状态钩子，可以二次修改数据，表单值的任何改变都会触发该钩子，返回的值为表单的最终结果值
   * @param val 当前表单值
   * @returns 表单结果值
   */
  postState: {
    type: Function as PropType<(val: any) => any>,
  },
  /**
   * 表单值发生变化后触发的回调函数
   * @param val 当前表单值
   */
  onChange: {
    type: Function as PropType<(val: any) => void>,
  },
  /**
   * @type {FieldOptions['transform']} pro-components-hooks
   */
  transform: {
    type: Function as PropType<(val: any, path: string) => any>,
  },
}

export type ProFieldProps = ExtractPublicPropTypes<typeof proFieldProps>
