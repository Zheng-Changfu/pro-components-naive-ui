import type { ExtractPublicPropTypes, PropType, VNodeChild } from 'vue'
import type { MaybeExpression } from 'pro-components-hooks'
import { proFieldProps, proFormItemProps } from '../form'
import type { ProButtonProps } from '../button'
import type { ProFormListInstance } from './inst'

export interface ActionGuard {
  /**
   * 添加行的拦截器
   * @param index 当前行索引
   * @param insertIndex 要插入的索引
   * @param total 当前列表总行数
   */
  beforeAddRow: (opt: { index: number, insertIndex: number, total: number }) => boolean | Promise<boolean>
  /**
   * 删除行的拦截器
   * @param index 当前行索引
   * @param total 当前列表总行数
   */
  beforeRemoveRow: (opt: { index: number, total: number }) => boolean | Promise<boolean>
}

export type ActionRender = (opt: {
  index: number
  total: number
  actionVNode: VNodeChild
  action: ProFormListInstance
}) => VNodeChild

export type ItemRender = (opt: {
  index: number
  total: number
  itemVNode: VNodeChild
  actionVNode: VNodeChild
  action: ProFormListInstance
}) => VNodeChild

export type ArrayFieldRender = (opt: {
  listVNode: VNodeChild
  fieldVNode: VNodeChild
  creatorButtonVNode: VNodeChild
}) => VNodeChild

export const proFormListProps = {
  /**
   * 继承属性
   */
  ...proFormItemProps,
  /**
   * 额外的字段属性
   */
  ...proFieldProps,
  /**
   * 重写类型
   */
  fieldRender: Function as PropType<ArrayFieldRender>,
  /**
   * 添加一行按钮显示在顶部还是底部
   *  顶部：每次添加数据都添加在首行
   *  底部：每次添加数据都添加在尾行
   * @default 'bottom'
   */
  position: String as PropType<MaybeExpression<'top' | 'bottom'>>,
  /**
   * 最少行数，删除时如果少于该数则无法删除
   */
  min: Number as PropType<MaybeExpression<number>>,
  /**
   * 最多行数，新增或复制时多于该数则无法新增或复制
   */
  max: [String, Number] as PropType<MaybeExpression<number>>,
  /**
   * 新增一行的默认值
   */
  creatorInitialValue: Object,
  /**
   * 新增一行按钮的属性，false 不显示
   */
  creatorButtonProps: {
    type: [Object, Boolean] as PropType<MaybeExpression<ProButtonProps | false>>,
    default: undefined,
  },
  /**
   * 复制按钮的属性，false 不显示
   */
  copyButtonProps: {
    type: [Object, Boolean] as PropType<MaybeExpression<ProButtonProps | false>>,
    default: undefined,
  },
  /**
   * 删除按钮的属性，false 不显示
   */
  removeButtonProps: {
    type: [Object, Boolean] as PropType<MaybeExpression<ProButtonProps | false>>,
    default: undefined,
  },
  /**
   * 列表操作的拦截器
   */
  actionGuard: Object as PropType<Partial<ActionGuard>>,
  /**
   * 自定义渲染每一行的结构，主要就是将 action 放在别的地方
   */
  itemRender: Function as PropType<ItemRender>,
  /**
   * 自定义渲染操作按钮
   */
  actionRender: Function as PropType<ActionRender>,
} as const

export type ProFormListProps = ExtractPublicPropTypes<typeof proFormListProps>
