import type { TransferProps } from 'naive-ui'
import type { SlotsType, VNodeChild } from 'vue'
import type { ProTransferSlots } from '../slots'
import { get, omit } from 'lodash-es'
import { NTransfer, transferProps } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'Transfer',
  inheritAttrs: false,
  props: {
    ...transferProps,
    labelField: String,
    valueField: String,
    placeholder: Array,
  },
  slots: Object as SlotsType<ProTransferSlots>,
  setup(props) {
    const {
      empty,
      value,
      readonly,
      emptyText,
    } = useReadonlyHelpers()

    const normalizedOptions = computed(() => {
      const {
        options = [],
        labelField = 'label',
        valueField = 'value',
      } = props

      return options.map((item) => {
        const label = get(item, labelField)
        const value = get(item, valueField)
        return {
          ...omit(item, [labelField, valueField]),
          label,
          value,
        }
      })
    })

    const nTransferProps = computed<TransferProps>(() => {
      const { placeholder, ...rest } = props
      const [s, t] = placeholder ?? []
      return {
        ...rest,
        options: normalizedOptions.value,
        sourceFilterPlaceholder: s as string,
        targetFilterPlaceholder: t as string,
      }
    })

    const selectedLabels = computed(() => {
      const selectedValue = value.value ?? []
      return normalizedOptions.value
        .filter(item => selectedValue.includes(item.value))
        .map(item => item.label)
    })

    return {
      empty,
      readonly,
      emptyText,
      selectedLabels,
      nTransferProps,
    }
  },
  render() {
    let dom: VNodeChild

    if (this.readonly) {
      dom = this.empty
        ? this.emptyText
        : this.selectedLabels.join('，')
    }
    else {
      dom = (
        <NTransfer
          {...this.$attrs}
          {...this.nTransferProps}
          v-slots={this.$slots}
        />
      )
    }

    return this.$slots.input
      ? this.$slots.input({
        inputDom: dom,
        readonly: this.readonly,
        inputProps: this.nTransferProps,
      })
      : dom
  },
})
