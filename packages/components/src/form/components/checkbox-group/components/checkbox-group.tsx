import type { CheckboxGroupProps, CheckboxProps, FlexProps } from 'naive-ui'
import type { PropType, SlotsType, VNodeChild } from 'vue'
import type { ProCheckboxGroupSlots } from '../slots'
import { get, toPath } from 'lodash-es'
import { checkboxGroupProps, NCheckbox, NCheckboxGroup, NFlex } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils } from '../../field'

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
      emptyDom,
    } = useFieldUtils()

    const normalizedOptions = computed(() => {
      const {
        options = [],
        labelField = 'label',
        valueField = 'value',
      } = props

      const labelFieldPath = toPath(labelField)
      const valueFieldPath = toPath(labelField)

      return options.map((item) => {
        const copyedItem = { ...item }
        const label = get(item, labelField)
        const value = get(item, valueField)
        if (labelFieldPath.length > 0) {
          delete copyedItem[labelFieldPath[0] as any]
        }
        if (valueFieldPath.length > 0) {
          delete copyedItem[valueFieldPath[0] as any]
        }
        return {
          ...copyedItem,
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
      emptyDom,
      selectedLabels,
      normalizedOptions,
      nCheckboxGroupProps,
    }
  },
  render() {
    let dom: VNodeChild

    if (this.readonly) {
      dom = this.empty
        ? this.emptyDom
        : <span>{this.selectedLabels.join('，')}</span>
    }
    else {
      dom = (
        <NCheckboxGroup
          {...this.$attrs}
          {...this.nCheckboxGroupProps}
        >
          {{
            default: () => {
              const flexProps = this.$props.flexProps ?? {}
              return (
                <NFlex {...flexProps}>
                  {
                    this.normalizedOptions.map((item) => {
                      return <NCheckbox key={item.value} {...item} />
                    })
                  }
                </NFlex>
              )
            },
          }}
        </NCheckboxGroup>
      )
    }

    return this.$slots.input
      ? this.$slots.input({
          inputDom: dom,
          readonly: this.readonly,
          inputProps: {
            ...this.nCheckboxGroupProps,
            options: this.normalizedOptions,
          },
        })
      : dom
  },
})
