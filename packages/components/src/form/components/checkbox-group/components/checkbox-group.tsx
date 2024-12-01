import type { CheckboxGroupProps, CheckboxProps, FlexProps } from 'naive-ui'
import type { PropType, SlotsType, VNodeChild } from 'vue'
import type { ProCheckboxGroupSlots } from '../slots'
import { get, omit } from 'lodash-es'
import { checkboxGroupProps, NCheckbox, NCheckboxGroup, NFlex } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { resolveSlot } from '../../../../_utils/resolveSlot'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'CheckboxGroup',
  inheritAttrs: false,
  props: {
    labelField: String,
    valueField: String,
    flexProps: Object as PropType<FlexProps>,
    options: Array as PropType<Array<CheckboxProps & ([x: string])>>,
    ...checkboxGroupProps,
  },
  slots: Object as SlotsType<ProCheckboxGroupSlots>,
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

    const nCheckboxGroupProps = computed<CheckboxGroupProps>(() => {
      const {
        options,
        flexProps,
        labelField,
        valueField,
        ...rest
      } = props
      return rest
    })

    const selectedLabels = computed(() => {
      const selectedValue = value.value ?? []
      return normalizedOptions.value
        .filter(item => selectedValue.includes(item.value))
        .map(item => item.label)
    })
    return {
      empty,
      value,
      readonly,
      emptyText,
      selectedLabels,
      normalizedOptions,
      nCheckboxGroupProps,
    }
  },
  render() {
    let dom: VNodeChild

    if (this.readonly) {
      dom = this.empty
        ? this.emptyText
        : this.$slots.default
          ? (this.value ?? []).join('，')
          : this.selectedLabels.join('，')
    }
    else {
      dom = (
        <NCheckboxGroup
          {...this.$attrs}
          {...this.nCheckboxGroupProps}
        >
          {{
            default: () => {
              return resolveSlot(this.$slots.default, () => [
                <NFlex {...(this.$props.flexProps ?? {})}>
                  {
                    this.normalizedOptions.map((item) => {
                      return <NCheckbox key={item.value} {...item} />
                    })
                  }
                </NFlex>,
              ])
            },
          }}
        </NCheckboxGroup>
      )
    }

    return this.$slots.input
      ? this.$slots.input({
        inputDom: dom,
        readonly: this.readonly,
        inputProps: this.nCheckboxGroupProps,
      })
      : dom
  },
})
