<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { TreeInst, TreeProps } from 'naive-ui'
import { NSpin, NTree } from 'naive-ui'
import { useOmitProps } from '../hooks'
import { proTreeExtendProps, proTreeProps } from './props'
import type { ProTreeSlots } from './slots'
import type { ProTreeInstance } from './inst'
import { useTreeData } from './useTreeData'
import { useExpandKeys } from './useExpandKeys'
import { useSelectKeys } from './useSelectKeys'
import { useCheckKeys } from './useCheckKeys'

export default defineComponent({
  name: 'ProTree',
  inheritAttrs: false,
  props: proTreeProps,
  slots: Object as SlotsType<ProTreeSlots>,
  setup(props, { expose }) {
    const treeInstRef = ref<TreeInst>()

    const treeProps = useOmitProps(
      props,
      proTreeExtendProps,
    )

    const {
      data,
      loading,
      controls,
      keyToTreeNodeMap,
      onLoad,
    } = useTreeData(props)

    const {
      expandedKeys,
      getExpandedKeys,
      setExpandedKeys,
      doUpdateExpandedKeys,
    } = useExpandKeys(props, { keyToTreeNodeMap })

    const {
      selectedKeys,
      getSelectedKeys,
      setSelectedKeys,
      doUpdateSelectedKeys,
    } = useSelectKeys(props, { keyToTreeNodeMap })

    const {
      checkedKeys,
      getCheckedKeys,
      setCheckedKeys,
      doUpdateCheckedKeys,
    } = useCheckKeys(props, { keyToTreeNodeMap })

    const nTreeProps = computed<TreeProps>(() => {
      const { remote, onLoad: userOnLoad } = props
      const loadFn = (remote || userOnLoad) ? onLoad : undefined
      return {
        ...treeProps.value,
        'ref': treeInstRef,
        'data': data.value,
        'loading': loading.value,
        'checkedKeys': checkedKeys.value,
        'expandedKeys': expandedKeys.value,
        'selectedKeys': selectedKeys.value,
        'onUpdate:checkedKeys': undefined,
        'onUpdate:expandedKeys': undefined,
        'onUpdate:selectedKeys': undefined,
        'onUpdateCheckedKeys': doUpdateCheckedKeys,
        'onUpdateExpandedKeys': doUpdateExpandedKeys,
        'onUpdateSelectedKeys': doUpdateSelectedKeys,
        'onLoad': loadFn,
      }
    })

    controls.onSuccess(() => {
      const { expandAllOnFetchSuccess } = props
      expandAllOnFetchSuccess && setExpandedKeys()
    })

    const exposed: ProTreeInstance = {
      getCheckedKeys,
      getSelectedKeys,
      getExpandedKeys,
      setCheckedKeys,
      setExpandedKeys,
      setSelectedKeys,
      getFetchControls: () => controls,
      getTreeData: () => data.value ?? [],
      getCheckedData: () => treeInstRef.value!.getCheckedData(),
      getIndeterminateData: () => treeInstRef.value!.getIndeterminateData(),
      scrollTo: (...args: any[]) => ((treeInstRef.value?.scrollTo) as any)(...args),
    }

    expose(exposed)
    return {
      loading,
      nTreeProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      $slots,
      loading,
      nTreeProps,
    } = this

    return (
      <NSpin
        show={loading}
        {...$props.spinProps}
        v-slots={{
          default: () => (
            <NTree
              {...$attrs}
              {...nTreeProps}
              v-slots={$slots}
            />
          ),
        }}
      />

    )
  },
})
</script>
