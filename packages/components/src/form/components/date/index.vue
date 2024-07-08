<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { DatePickerInst, DatePickerProps } from 'naive-ui'
import { NDatePicker } from 'naive-ui'
import dayjs from 'dayjs'
import { isString } from 'lodash-es'
import { ProFormItem } from '../../form-item'
import { resolveField, useField, useFieldBindValues } from '../../field'
import { isEmptyValue } from '../../form-item/utils/valueUtil'
import { proDateProps } from './props'
import type { ProDateSlots } from './slots'
import type { ProDateInstance } from './inst'

export default defineComponent({
  name: 'ProDate',
  props: proDateProps,
  slots: Object as SlotsType<ProDateSlots>,
  setup(props, { expose }) {
    const pickerInstRef = ref<DatePickerInst>()

    const field = useField('ProDate', props, {
      defaultValue: null,
      postState: convertStringToTimestamp,
    })

    const {
      bindValues,
      placeholder,
    } = useFieldBindValues(field, props)

    function convertStringToTimestamp(val: any) {
      const { postState } = props
      if (postState) {
        return postState(val)
      }
      if (isEmptyValue(val)) {
        return null
      }
      if (isString(val)) {
        return dayjs(val).valueOf()
      }
      return val
    }

    const nPickerProps = computed<DatePickerProps>(() => {
      const { type } = bindValues.value
      const { value, doUpdateValue } = field
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
        'onUpdateValue': doUpdateValue,
        'placeholder': placeholder.value,
        'type': type === 'datetime' ? 'datetime' : 'date',
      }
    })

    const exposed: ProDateInstance = {
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
              $props.renderField,
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
