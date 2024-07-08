<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { TimePickerInst, TimePickerProps } from 'naive-ui'
import { NTimePicker } from 'naive-ui'
import dayjs from 'dayjs'
import { isString } from 'lodash-es'
import { resolveField, useField, useFieldBindValues } from '../../field'
import { isEmptyValue } from '../../form-item/utils/valueUtil'
import { ProFormItem } from '../../form-item'
import { proTimeProps } from './props'
import type { ProTimeSlots } from './slots'
import type { ProTimeInstance } from './inst'

export default defineComponent({
  name: 'ProTime',
  props: proTimeProps,
  slots: Object as SlotsType<ProTimeSlots>,
  setup(props, { expose }) {
    const pickerInstRef = ref<TimePickerInst>()

    const field = useField('ProTime', props, {
      defaultValue: null,
      postState: convertStringToTimestamp,
    })

    const bindValues = useFieldBindValues(
      field,
      props,
    )

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

    const nPickerProps = computed<TimePickerProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...bindValues.value,
        'ref': pickerInstRef,
        'value': value.value,
        'defaultValue': undefined,
        'formattedValue': undefined,
        'onUpdate:value': undefined,
        'onUpdateValue': doUpdateValue,
        'defaultFormattedValue': undefined,
        'onUpdateFormattedValue': undefined,
        'onUpdate:formattedValue': undefined,
      }
    })

    const exposed: ProTimeInstance = {
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
                <NTimePicker
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
