import type { DatePickerProps, TimePickerProps } from 'naive-ui'
import type { PropType, SlotsType, VNodeChild } from 'vue'
import type { ProDatePickerSlots } from '../slots'
import { isArray, isString } from 'lodash-es'
import { datePickerProps, NDatePicker, NFlex } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useFieldUtils } from '../../field'
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
      validationStatus,
    } = useFieldUtils()

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
      validationStatus,
      arrayableDateText,
    }
  },
  render() {
    let dom: VNodeChild

    if (this.readonly) {
      if (this.empty) {
        dom = this.emptyText
      }
      else if (this.arrayableDateText) {
        const separator = this.$slots.separator?.() ?? this.$props.separator
        dom = (
          <NFlex size={[8, 0]}>
            <span>{(this.displayDateText as [string, string])[0]}</span>
            {separator && <span>{separator}</span>}
            <span>{(this.displayDateText as [string, string])[1]}</span>
          </NFlex>
        )
      }
      else {
        dom = this.displayDateText
      }
    }
    else {
      dom = (
        <NDatePicker
          ref="instRef"
          {...this.$attrs}
          {...this.nDatePickerProps}
          v-slots={this.$slots}
        />
      )
    }

    return this.$slots.input
      ? this.$slots.input({
        inputDom: dom,
        readonly: this.readonly,
        inputProps: this.nDatePickerProps,
        ...this.validationStatus,
      })
      : dom
  },
})
