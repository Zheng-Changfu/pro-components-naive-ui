import type { DeepReadonly } from 'vue'
import type { ProFieldSharedSlots } from '../form/components'
import type { ProFormListInst } from './inst'
import type { ActionRender, ContainerRender, ItemRender } from './props'

export interface ProFormListSlots extends Omit<ProFieldSharedSlots<any>, 'input'> {
  default: {
    /**
     * 当前行索引
     */
    index: number
    /**
     * 总行数
     */
    total: number
    /**
     * 操作行的一些方法
     */
    action: ProFormListInst
    /**
     * 当前行信息,它是只读的
     */
    row: DeepReadonly<Record<string, any>>
    /**
     * 当前行的路径
     */
    rowPath: string
  }
  /**
   * 自定义渲染每一行的结构，主要就是将 action 放在别的地方
   */
  item: Parameters<ItemRender>['0']
  /**
   * 自定义渲染操作按钮
   */
  action: Parameters<ActionRender>['0']
  /**
   * 自定义渲染容器
   */
  container: Parameters<ContainerRender>['0']
}
