import type { TreeSelectInst } from 'naive-ui'
import { createInjectionState } from '@vueuse/core'
import { useComponentInst } from '../../../composables'

export type ProTreeSelectInst = TreeSelectInst & {
  /**
   * 获取全部节点的 keys
   */
  getFullKeys: () => Array<string | number>
  /**
   * 获取勾选的节点 keys
   */
  getCheckedKeys: () => Array<string | number>
  /**
   * 获取展开的节点 keys
   */
  getExpandedKeys: () => Array<string | number>
  /**
   * 获取指定层级的 keys
   * @param level 层级，大于 0
   * @param getLtLevelKey 是否需要小于指定层级的 keys，默认值 true
   */
  getLevelKeys: (level: number, getLtLevelKey?: boolean) => Array<string | number>
  /**
   * 获取 `disabled` 为 false 的 keys
   */
  getEnabledKeys: () => Array<string | number>
  /**
   * 展开节点，不传展开全部
   * @param keys 需要展开的 keys
   */
  setExpandedKeys: (keys?: Array<string | number>) => void
  /**
   * 勾选节点，不传勾选所有
   * @param keys 需要勾选的 keys
   */
  setCheckedKeys: (keys?: Array<string | number>) => void
  /**
   * 获取部分选中选项的 keys
   */
  getIndeterminateKeys: () => Array<string | number>
  /**
   * 设置部分选中 keys
   * @param keys 需要部分选中的 keys
   */
  setIndeterminateKeys: (keys: Array<string | number>) => void
}

const [
  provideTreeSelectInstStore,
  useInjectTreeSelectInstStore,
] = createInjectionState(useComponentInst<ProTreeSelectInst>)

export {
  provideTreeSelectInstStore,
  useInjectTreeSelectInstStore,
}
