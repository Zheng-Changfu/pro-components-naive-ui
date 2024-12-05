import type { TreeSelectInst } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProTreeSelectSlots } from '../slots'
import { get, isArray, noop } from 'lodash-es'
import { NFlex, NTreeSelect, treeSelectProps } from 'naive-ui'
import { eachTree } from 'pro-composables'
import { computed, defineComponent, ref } from 'vue'
import { useReadonlyHelpers } from '../../field'
import { useInjectTreeSelectInstStore } from '../inst'

export default defineComponent({
  name: 'TreeSelect',
  props: treeSelectProps,
  slots: Object as SlotsType<ProTreeSelectSlots>,
  inheritAttrs: false,
  setup(props) {
    const instRef = ref<TreeSelectInst>()

    const {
      registerInst,
    } = useInjectTreeSelectInstStore()!

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
        keyField = 'key',
        labelField = 'label',
        childrenField = 'children',
      } = props

      const labels: VNodeChild[] = []
      const selectedValue = isArray(value.value) ? value.value : [value.value]
      eachTree(
        options,
        (item) => {
          const value = get(item, keyField)
          if (selectedValue.includes(value)) {
            let label = get(item, labelField) as VNodeChild
            if (renderTag) {
              label = renderTag({ option: item as any, handleClose: noop })
            }
            if (renderLabel) {
              label = renderLabel({ option: item, checked: true, selected: true })
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
      blurInput: () => instRef.value?.blurInput(),
      focusInput: () => instRef.value?.focusInput(),
      getCheckedData: () => instRef.value!.getCheckedData(),
      getIndeterminateData: () => instRef.value!.getIndeterminateData(),
    })
    return {
      empty,
      instRef,
      readonly,
      emptyText,
      selectedLabels,
    }
  },
  render() {
    let dom: VNodeChild

    if (this.readonly) {
      dom = this.empty
        ? this.emptyText
        : (
            <NFlex size={[8, 0]}>
              {this.selectedLabels}
            </NFlex>
          )
    }
    else {
      dom = (
        <NTreeSelect
          ref="instRef"
          {...this.$attrs}
          {...this.$props}
          v-slots={this.$slots}
        />
      )
    }

    return this.$slots.input
      ? this.$slots.input({
        inputDom: dom,
        readonly: this.readonly,
        inputProps: this.$props,
      })
      : dom
  },
})
