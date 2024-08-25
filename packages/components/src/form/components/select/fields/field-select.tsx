import { NEl, NFlex, NSelect, selectProps } from 'naive-ui'
import { eachTree } from 'pro-components-hooks'
import { get, isArray, isFunction, noop } from 'lodash-es'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProSelectSlots } from '../slots'
import { useProSelectInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'ProFieldSelect',
  props: selectProps,
  slots: Object as SlotsType<ProSelectSlots>,
  inheritAttrs: false,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProSelectInst()

    const {
      empty,
      value,
      readonly,
      emptyText,
    } = useReadonlyHelpers()

    const selectedLabels = computed(() => {
      const {
        renderTag,
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
            if (renderTag) {
              label = renderTag({ option: item as any, handleClose: noop })
            }
            if (renderLabel) {
              label = renderLabel(item as any, true)
            }
            if (isFunction(label)) {
              label = label(item, true)
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
      <NSelect
        ref="instRef"
        {...this.$props}
        {...this.$attrs}
        v-slots={this.$slots}
      />
    )
  },
})
