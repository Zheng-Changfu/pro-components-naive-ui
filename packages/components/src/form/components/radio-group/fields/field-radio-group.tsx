import type { FlexProps, RadioGroupProps, RadioProps } from 'naive-ui'
import type { PropType, SlotsType } from 'vue'
import type { ProRadioGroupSlots } from '../slots'
import { get, omit } from 'lodash-es'
import { NFlex, NRadio, NRadioGroup, radioGroupProps } from 'naive-ui'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'ProFieldRadioGroup',
  inheritAttrs: false,
  props: {
    labelField: String,
    valueField: String,
    flexProps: Object as PropType<FlexProps>,
    options: Array as PropType<Array<RadioProps & ([x: string])>>,
    ...radioGroupProps,
  },
  slots: Object as SlotsType<ProRadioGroupSlots>,
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

    const nRadioGroupProps = computed<RadioGroupProps>(() => {
      const {
        options,
        flexProps,
        labelField,
        valueField,
        ...rest
      } = props
      return rest
    })

    const selectedLabel = computed(() => {
      const selectedValue = value.value
      const valueLabelOption = normalizedOptions.value.find(item => item.value === selectedValue)
      return valueLabelOption ? (valueLabelOption.label ?? selectedValue) : selectedValue
    })
    return {
      empty,
      value,
      readonly,
      emptyText,
      selectedLabel,
      nRadioGroupProps,
      normalizedOptions,
    }
  },
  render() {
    if (this.readonly) {
      const { empty, value, emptyText, selectedLabel } = this

      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      if (empty) {
        return emptyText
      }
      if (this.$slots.default) {
        return value
      }
      return selectedLabel
    }
    return (
      <NRadioGroup {...this.nRadioGroupProps} {...this.$attrs}>
        {{
          default: () => {
            if (this.$slots.default) {
              return this.$slots.default()
            }
            return (
              <NFlex {...(this.$props.flexProps ?? {})}>
                {
                  this.normalizedOptions.map((item) => {
                    return <NRadio key={item.value} {...item} />
                  })
                }
              </NFlex>
            )
          },
        }}
      </NRadioGroup>
    )
  },
})
