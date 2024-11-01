import type { MaybeExpression } from 'pro-components-hooks'
import type { ExtractPublicPropTypes, PropType, VNodeChild } from 'vue'
import type { ProButtonProps } from '../button'
import type { ProFormListInst } from './inst'
import { proFieldProps } from '../form'

export interface ActionGuard {
  /**
   * 添加行之前触发的回调，可以阻止添加
   * @param index 当前行索引
   * @param insertIndex 要插入的索引
   * @param total 当前列表总行数
   */
  beforeAddRow: (opt: { index: number, insertIndex: number, total: number }) => boolean | Promise<boolean>
  /**
   * 添加行之后触发的回调
   * @param index 当前行索引
   * @param insertIndex 要插入的索引
   * @param total 当前列表总行数
   */
  afterAddRow: (opt: { index: number, insertIndex: number, total: number }) => void
  /**
   * 删除行之前触发的回调，可以阻止删除
   * @param index 当前行索引
   * @param total 当前列表总行数
   */
  beforeRemoveRow: (opt: { index: number, total: number }) => boolean | Promise<boolean>
  /**
   * 删除行之后触发的回调
   * @param index 当前行索引
   * @param total 当前列表总行数
   */
  afterRemoveRow: (opt: { index: number, total: number }) => void
}

export type ActionRender = (opt: {
  index: number
  total: number
  actionVNode: VNodeChild
  action: ProFormListInst
}) => VNodeChild

export type ItemRender = (opt: {
  index: number
  total: number
  itemVNode: VNodeChild
  actionVNode: VNodeChild
  action: ProFormListInst
}) => VNodeChild

export type ContainerRender = (opt: {
  listVNode: VNodeChild
  creatorButtonVNode: VNodeChild
}) => VNodeChild

export const proFormListProps = {
  /**
   * 额外的字段属性
   */
  ...proFieldProps,
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
  max: [Number] as PropType<MaybeExpression<number>>,
  /**
   * 只显示第一行的 label
   */
  onlyShowFirstItemLabel: {
    type: [String, Boolean] as PropType<MaybeExpression<boolean>>,
    default: undefined,
  },
  /**
   * 新增一行的默认值
   */
  creatorInitialValue: Function as PropType<() => Record<string, any>>,
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
} as const

export type ProFormListProps = ExtractPublicPropTypes<typeof proFormListProps>
