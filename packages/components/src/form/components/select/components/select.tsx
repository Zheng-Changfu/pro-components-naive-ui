import type { SlotsType, VNodeChild } from 'vue'
import type { ProSelectSlots } from '../slots'
import { get, isArray, isFunction, noop } from 'lodash-es'
import { NFlex, NSelect, selectProps } from 'naive-ui'
import { eachTree } from 'pro-composables'
import { computed, defineComponent } from 'vue'
import { useFieldUtils } from '../../field'
import { useInjectSelectInstStore } from '../inst'

export default defineComponent({
  name: 'Select',
  props: selectProps,
  slots: Object as SlotsType<ProSelectSlots>,
  inheritAttrs: false,
  setup(props) {
    const {
      instRef,
      registerInst,
    } = useInjectSelectInstStore()!

    const {
      empty,
      value,
      readonly,
      emptyDom,
    } = useFieldUtils()

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
    })
    return {
      empty,
      instRef,
      readonly,
      emptyDom,
      selectedLabels,
    }
  },
  render() {
    let dom: VNodeChild

    if (this.readonly) {
      dom = this.empty
        ? this.emptyDom
        : (
            <NFlex size="small">
              {this.selectedLabels}
            </NFlex>
          )
    }
    else {
      dom = (
        <NSelect
          ref="instRef"
          {...this.$props}
          {...this.$attrs}
          v-slots={this.$slots}
        >
        </NSelect>
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
