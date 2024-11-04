import type { CheckboxGroupProps, CheckboxProps, FlexProps } from 'naive-ui'
import type { PropType, SlotsType } from 'vue'
import type { ProCheckboxGroupSlots } from '../slots'
import { get, omit } from 'lodash-es'
import { checkboxGroupProps, NCheckbox, NCheckboxGroup, NFlex } from 'naive-ui'
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
    if (this.readonly) {
      const { empty, value, emptyText, selectedLabels } = this

      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      if (empty) {
        return emptyText
      }
      if (this.$slots.default) {
        return (value ?? []).join('，')
      }
      return selectedLabels.join('，')
    }
    return (
      <NCheckboxGroup
        {...this.$attrs}
        {...this.nCheckboxGroupProps}
      >
        {{
          default: () => {
            if (this.$slots.default) {
              return this.$slots.default()
            }
            return (
              <NFlex {...(this.$props.flexProps ?? {})}>
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
  },
})
