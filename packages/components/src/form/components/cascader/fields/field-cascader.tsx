import { NCascader, NEl, NFlex, cascaderProps } from 'naive-ui'
import { get, isArray } from 'lodash-es'
import { eachTree } from 'pro-components-hooks'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProCascaderSlots } from '../slots'
import { useProCascaderInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'ProFieldCascader',
  inheritAttrs: false,
  props: cascaderProps,
  slots: Object as SlotsType<ProCascaderSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProCascaderInst()

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
              labels.push(<NEl>{label}</NEl>)
            }
          }
        },
        childrenField,
      )

      return labels
    })

    expose(methods)
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
