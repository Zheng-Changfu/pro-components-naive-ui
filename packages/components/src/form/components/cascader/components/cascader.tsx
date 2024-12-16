import type { SlotsType, VNodeChild } from 'vue'
import type { ProCascaderSlots } from '../slots'
import { get, isArray } from 'lodash-es'
import { cascaderProps, NCascader, NFlex } from 'naive-ui'
import { eachTree } from 'pro-composables'
import { computed, defineComponent } from 'vue'
import { useFieldUtils } from '../../field'
import { useInjectCascaderInstStore } from '../inst'

export default defineComponent({
  name: 'Cascader',
  inheritAttrs: false,
  // 这个 props 类型复杂会导致构建类型声明文件失败，先用 any 解决
  props: cascaderProps as any,
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
      emptyDom,
    } = useFieldUtils()

    const selectedLabels = computed(() => {
      const {
        renderLabel,
        options = [],
        labelField = 'label',
        valueField = 'value',
        childrenField = 'children',
      } = props as any

      const labels: VNodeChild[] = []
      const selectedValue = isArray(value.value) ? value.value : [value.value]
      eachTree(
        options as any[],
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
        <NCascader
          ref="instRef"
          {...this.$props}
          {...this.$attrs}
        >
          {this.$slots}
        </NCascader>
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
