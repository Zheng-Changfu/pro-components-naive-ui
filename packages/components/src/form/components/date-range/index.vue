<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { DatePickerInst, DatePickerProps } from 'naive-ui'
import { NDatePicker } from 'naive-ui'
import dayjs from 'dayjs'
import { isString } from 'lodash-es'
import { resolveField, useField, useFieldBindValues } from '../../field'
import { ProFormItem } from '../../form-item'
import { isEmptyValue } from '../../form-item/utils/valueUtil'
import { proDateRangeProps } from './props'
import type { ProDateRangeSlots } from './slots'
import type { ProDateRangeInstance } from './inst'

export default defineComponent({
  name: 'ProDateRange',
  props: proDateRangeProps,
  slots: Object as SlotsType<ProDateRangeSlots>,
  setup(props, { expose }) {
    const pickerInstRef = ref<DatePickerInst>()

    const field = useField('ProDateRange', props, {
      defaultValue: null,
      postState: convertStringArrayToTimestampArray,
    })

    const {
      bindValues,
      placeholder,
    } = useFieldBindValues(field, props)

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
      const { type } = bindValues.value
      const { value, doUpdateValue } = field
      const [sp, ep] = placeholder.value ?? []
      return {
        ...bindValues.value as any,
        'defaultTime': undefined,
        'defaultValue': undefined,
        'formattedValue': undefined,
        'onUpdate:value': undefined,
        'defaultFormattedValue': undefined,
        'onUpdateFormattedValue': undefined,
        'onUpdate:formattedValue': undefined,

        'ref': pickerInstRef,
        'value': value.value,
        'endPlaceholder': ep,
        'startPlaceholder': sp,
        'onUpdateValue': doUpdateValue,
        'type': type === 'datetimerange' ? 'datetimerange' : 'daterange',
      }
    })

    const exposed: ProDateRangeInstance = {
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
                bindValues: this.nPickerProps,
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
