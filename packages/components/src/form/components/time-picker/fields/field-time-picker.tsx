import type { TimePickerProps } from 'naive-ui'
import type { PropType, SlotsType } from 'vue'
import type { ProTimePickerSlots } from '../slots'
import { isString } from 'lodash-es'
import { NTimePicker, timePickerProps } from 'naive-ui'
import { computed } from 'vue'
import { toDisplayDate } from '../../date-picker/fields/utils/toDisplayDate'
import { useReadonlyHelpers } from '../../field'
import { useProTimePickerInst } from '../inst'
import { useMergeFormat } from './composables/useMergeFormat'

export default defineComponent({
  name: 'ProFieldTimePicker',
  inheritAttrs: false,
  /**
   * 支持 value 传递字符串
   */
  props: {
    ...timePickerProps,
    value: [String, Number] as PropType<string | number | null>,
    formattedValue: [String, Number] as PropType<string | number | null>,
  },
  slots: Object as SlotsType<ProTimePickerSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProTimePickerInst()

    const {
      value,
      empty,
      readonly,
      emptyText,
    } = useReadonlyHelpers()

    const mergedFormat = useMergeFormat(props as any)

    /**
     * 传递了 value-format 属性并且 value 是一个字符串 使用 v-model:formattedValue
     * 默认使用 v-model:value
     */
    const vModelProps = computed<TimePickerProps>(() => {
      const {
        value,
        valueFormat,
        onUpdateValue,
      } = props

      if (valueFormat && isString(value)) {
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

    const nTimePickerProps = computed<TimePickerProps>(() => {
      const { value, onUpdateValue, ...rest } = props
      return {
        ...rest as any,
        ...vModelProps.value,
      }
    })

    const displayDateText = computed(() => {
      return toDisplayDate(
        value.value,
        mergedFormat.value,
      )
    })

    expose(methods)
    return {
      empty,
      instRef,
      readonly,
      emptyText,
      displayDateText,
      nTimePickerProps,
    }
  },
  render() {
    if (this.readonly) {
      const { empty, emptyText, displayDateText } = this

      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      if (empty) {
        return emptyText
      }
      return displayDateText
    }
    return (
      <NTimePicker
        ref="instRef"
        {...this.$attrs}
        {...this.nTimePickerProps}
        v-slots={this.$slots}
      />
    )
  },
})
