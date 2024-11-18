import type { SlotsType, VNodeChild } from 'vue'
import type { ProCascaderSlots } from '../slots'
import { get, isArray } from 'lodash-es'
import { cascaderProps, NCascader, NFlex } from 'naive-ui'
import { eachTree } from 'pro-composables'
import { useReadonlyHelpers } from '../../field'
import { useInjectCascaderInstStore } from '../inst'

export default defineComponent({
  name: 'Cascader',
  inheritAttrs: false,
  props: cascaderProps,
  slots: Object as SlotsType<ProCascaderSlots>,
  setup(props) {
    const {
      instRef,
      registerInst,
    } = useInjectCascaderInstStore()!

    const {
      empty,
      value,
      readonly,
      emptyText,
    } = useReadonlyHelpers()

    const selectedLabels = computed(() => {
      const {
        renderLabel,
        options = [],
        labelField = 'label',
        valueField = 'value',
        childrenField = 'children',
      } = props
      const labels: VNodeChild[] = []
      const selectedValue = isArray(value.value) ? value.value : [value.value]
      eachTree(
        options,
        (item) => {
          const value = get(item, valueField)
          if (selectedValue.includes(value)) {
            let label = get(item, labelField) as VNodeChild
            if (renderLabel) {
              label = renderLabel(item as any, true)
            }
            if (label) {
              labels.push(<span>{label}</span>)
            }
          }
        },
        childrenField,
      )

      return labels
    })

    registerInst({
      blur: () => instRef.value?.blur(),
      focus: () => instRef.value?.focus(),
      getCheckedData: () => instRef.value?.getCheckedData() as any,
      getIndeterminateData: () => instRef.value?.getIndeterminateData() as any,
    })
    return {
      empty,
      value,
      instRef,
      readonly,
      emptyText,
      selectedLabels,
    }
  },
  render() {
    if (this.readonly) {
      const { empty, emptyText, selectedLabels } = this

      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      if (empty) {
        return emptyText
      }
      return (
        <NFlex size={[8, 0]}>
          {selectedLabels}
        </NFlex>
      )
    }
    return (
      <NCascader
        ref="instRef"
        {...this.$props}
        {...this.$attrs}
        v-slots={this.$slots}
      />
    )
  },
})
