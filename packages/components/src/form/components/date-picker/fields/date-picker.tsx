import type { DatePickerProps, TimePickerProps } from 'naive-ui'
import type { PropType, SlotsType } from 'vue'
import type { ProDatePickerSlots } from '../slots'
import { isArray, isString } from 'lodash-es'
import { datePickerProps, NDatePicker, NEl, NFlex } from 'naive-ui'
import { computed } from 'vue'
import { useReadonlyHelpers } from '../../field'
import { useInjectDatePickerInstStore } from '../inst'
import { useMergeFormat } from './composables/useMergeFormat'
import { toDisplayDate } from './utils/toDisplayDate'

export default defineComponent({
  name: 'DatePicker',
  inheritAttrs: false,
  /**
   * 支持 value 传递字符串
   */
  props: {
    ...datePickerProps,
    placeholder: [String, Array],
    value: [String, Number, Array] as PropType<string | number | Array<string | number> | null>,
    formattedValue: [String, Number] as PropType<string | number | Array<string | number> | null>,
  },
  slots: Object as SlotsType<ProDatePickerSlots>,
  setup(props) {
    const {
      instRef,
      registerInst,
    } = useInjectDatePickerInstStore()!

    const {
      empty,
      value,
      readonly,
      emptyText,
    } = useReadonlyHelpers()

    const mergedFormat = useMergeFormat(props as any)

    /**
     * 传递了 value-format 属性并且 value 是一个字符串或者字符串数组使用 v-model:formattedValue
     * 默认使用 v-model:value
     */
    const vModelProps = computed<TimePickerProps>(() => {
      const {
        value,
        valueFormat,
        onUpdateValue,
      } = props
      if (valueFormat && (isString(value) || (isArray(value) && value.every(isString)))) {
        return {
          formattedValue: value,
          onUpdateFormattedValue: onUpdateValue,
        } as any
      }

      return {
        value,
        onUpdateValue,
      }
    })

    const convertPlaceholder = computed(() => {
      const { placeholder } = props
      if (!isArray(placeholder)) {
        return { placeholder }
      }
      const [sp, ep] = placeholder
      return {
        endPlaceholder: ep,
        startPlaceholder: sp,
      }
    })

    const nDatePickerProps = computed<DatePickerProps>(() => {
      const { value, onUpdateValue, placeholder, ...rest } = props
      return {
        ...rest as any,
        ...vModelProps.value,
        ...convertPlaceholder.value,
      }
    })

    const displayDateText = computed(() => {
      return toDisplayDate(
        value.value,
        mergedFormat.value,
      )
    })

    const arrayableDateText = computed(() => {
      return isArray(displayDateText.value)
    })

    registerInst({
      blur: () => instRef.value?.blur(),
      focus: () => instRef.value?.focus(),
    })
    return {
      empty,
      instRef,
      readonly,
      emptyText,
      displayDateText,
      nDatePickerProps,
      arrayableDateText,
    }
  },
  render() {
    if (this.readonly) {
      const { empty, emptyText, arrayableDateText, displayDateText } = this

      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      if (empty) {
        return emptyText
      }
      if (arrayableDateText) {
        const separator = this.$slots.separator?.() ?? this.$props.separator
        return (
          <NFlex size={[8, 0]}>
            <NEl>{(displayDateText as [string, string])[0]}</NEl>
            {separator && <NEl>{separator}</NEl>}
            <NEl>{(displayDateText as [string, string])[1]}</NEl>
          </NFlex>
        )
      }
      return displayDateText
    }
    return (
      <NDatePicker
        ref="instRef"
        {...this.$attrs}
        {...this.nDatePickerProps}
        v-slots={this.$slots}
      />
    )
  },
})
