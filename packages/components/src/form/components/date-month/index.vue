<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { DatePickerInst, DatePickerProps } from 'naive-ui'
import { NDatePicker } from 'naive-ui'
import dayjs from 'dayjs'
import { isString } from 'lodash-es'
import { resolveField, useField, useParseFieldProps } from '../../field'
import { isEmptyValue } from '../../form-item/utils/valueUtil'
import { ProFormItem } from '../../form-item'
import { proDateMonthProps } from './props'
import type { ProDateMonthSlots } from './slots'
import type { ProDateMonthInstance } from './inst'

export default defineComponent({
  name: 'ProDateMonth',
  props: proDateMonthProps,
  slots: Object as SlotsType<ProDateMonthSlots>,
  setup(props, { expose }) {
    const pickerInstRef = ref<DatePickerInst>()

    const field = useField('ProDateMonth', props, {
      defaultValue: null,
      postState: convertStringToTimestamp,
    })

    const parsedProps = useParseFieldProps(
      props,
      field,
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

    const nPickerProps = computed<DatePickerProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...parsedProps.value as any,
        'defaultTime': undefined,
        'defaultValue': undefined,
        'formattedValue': undefined,
        'onUpdate:value': undefined,
        'defaultFormattedValue': undefined,
        'onUpdateFormattedValue': undefined,
        'onUpdate:formattedValue': undefined,
        'type': 'month',
        'ref': pickerInstRef,
        'value': value.value,
        'onUpdateValue': doUpdateValue,
      }
    })

    const exposed: ProDateMonthInstance = {
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
