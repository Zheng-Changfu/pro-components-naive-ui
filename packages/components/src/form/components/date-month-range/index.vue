<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { DatePickerInst, DatePickerProps } from 'naive-ui'
import { NDatePicker } from 'naive-ui'
import dayjs from 'dayjs'
import { isString } from 'lodash-es'
import { resolveField, useField, useParseFieldProps } from '../../field'
import { ProFormItem } from '../../form-item'
import { isEmptyValue } from '../../form-item/utils/valueUtil'
import { proDateMonthRangeProps } from './props'
import type { ProDateMonthRangeSlots } from './slots'
import type { ProDateMonthRangeInstance } from './inst'

export default defineComponent({
  name: 'ProDateMonthRange',
  props: proDateMonthRangeProps,
  slots: Object as SlotsType<ProDateMonthRangeSlots>,
  setup(props, { expose }) {
    const pickerInstRef = ref<DatePickerInst>()

    const field = useField('ProDateMonthRange', props, {
      defaultValue: null,
      postState: convertStringArrayToTimestampArray,
    })

    const parsedProps = useParseFieldProps(
      props,
      field,
    )

    function convertStringToTimestamp(val: any) {
      if (isEmptyValue(val)) {
        return null
      }
      if (isString(val)) {
        return dayjs(val).valueOf()
      }
      return val
    }

    function convertStringArrayToTimestampArray(val: any) {
      const { postState } = props
      if (postState) {
        return postState(val)
      }
      if (isEmptyValue(val)) {
        return null
      }
      let [s, e] = val ?? []
      s = convertStringToTimestamp(s)
      e = convertStringToTimestamp(e)
      const r = [s, e].filter(Boolean)
      return r.length > 0 ? r : null
    }

    const nPickerProps = computed<DatePickerProps>(() => {
      const { value, doUpdateValue } = field
      const { placeholder, ...restProps } = parsedProps.value
      const [sp, ep] = placeholder ?? []
      return {
        ...restProps as any,
        'defaultTime': undefined,
        'defaultValue': undefined,
        'formattedValue': undefined,
        'onUpdate:value': undefined,
        'defaultFormattedValue': undefined,
        'onUpdateFormattedValue': undefined,
        'onUpdate:formattedValue': undefined,
        'type': 'monthrange',
        'ref': pickerInstRef,
        'value': value.value,
        'endPlaceholder': ep,
        'startPlaceholder': sp,
        'onUpdateValue': doUpdateValue,
      }
    })

    const exposed: ProDateMonthRangeInstance = {
      blur: () => pickerInstRef.value?.blur(),
      focus: () => pickerInstRef.value?.focus(),
    }

    expose(exposed)
    return {
      nPickerProps,
    }
  },
  render() {
    const {
      $props,
      $slots,
    } = this

    return (
      <ProFormItem
        {...$props}
        v-slots={{
          default: () => {
            return resolveField(
              $props.fieldRender,
              {
                bindSlots: $slots,
                bindProps: this.nPickerProps,
              },
              () => (
                <NDatePicker
                  {...this.nPickerProps}
                  v-slots={$slots}
                />
              ),
            )
          },
        }}
      >
      </ProFormItem>
    )
  },
})
</script>
