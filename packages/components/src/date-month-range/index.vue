<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref, toRef } from 'vue'
import type { DatePickerInst, DatePickerProps } from 'naive-ui'
import { NDatePicker } from 'naive-ui'
import { createField, useCompile } from 'pro-components-hooks'
import dayjs from 'dayjs'
import { isArray, isString } from 'lodash-es'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { useInjectGlobalConfigContext } from '../config-provider'
import { proDateMonthRangeProps } from './props'
import type { ProDateMonthRangeSlots } from './slots'
import { proDateMonthRangeExtendSlotKeys } from './slots'
import type { ProDateMonthRangeInstance } from './inst'

dayjs.extend(customParseFormat)
export default defineComponent({
  name: 'ProDateMonthRange',
  props: proDateMonthRangeProps,
  slots: Object as SlotsType<ProDateMonthRangeSlots>,
  setup(props, { slots, expose }) {
    let shouldConvertValueOnTransform = false
    const pickerInstRef = ref<DatePickerInst>()
    const { proDateMonthRange } = useInjectGlobalConfigContext()
    const pickerSlots = useOmitSlots(slots, proDateMonthRangeExtendSlotKeys)

    const proFieldProps = useGetProFieldProps(props)
    const field = createField({
      ...proFieldProps,
      defaultValue: null,
      transform: convertTimestampArrayToStringArray,
      postState: convertStringArrayToTimestampArray,
    })

    const {
      value,
      scope,
      stringPath,
      doUpdateValue,
    } = field

    /**
     * 可在表单组件层编译，也可以在 form-item 中编译
     */
    const compiledFieldProps = useCompile(
      toRef(props, 'fieldProps'),
      { scope },
    )

    const valueFormat = computed(() => {
      const { valueFormat } = compiledFieldProps.value
      return valueFormat ?? proDateMonthRange.valueFormat
    })

    function convertStringToTimestamp(val: any) {
      const { postState } = props
      if (isString(val)) {
        shouldConvertValueOnTransform = true
        const timestamp = dayjs(val).format(valueFormat.value).valueOf()
        return postState ? postState(timestamp) : timestamp
      }
      else {
        shouldConvertValueOnTransform = false
        return postState ? postState(val) : val
      }
    }

    function convertStringArrayToTimestampArray(val: any) {
      let [s, e] = val ?? []
      s = convertStringToTimestamp(s)
      e = convertStringToTimestamp(e)
      return (val && val.length > 0) ? [s, e] : val
    }

    function convertTimestampToString(val: any, path: string) {
      const { transform } = props
      if (shouldConvertValueOnTransform) {
        const stringDate = dayjs(val).format(valueFormat.value)
        return transform ? transform(stringDate, path) : stringDate
      }
      else {
        return transform ? transform(val, path) : val
      }
    }

    function convertTimestampArrayToStringArray(val: any, path: string) {
      let [s, e] = val ?? []
      s = convertTimestampToString(s, path)
      e = convertTimestampToString(e, path)
      return (val && val.length > 0) ? [s, e] : val
    }

    /**
     * 注入自定义属性，在 pro-form-item 中完善 ProComponentConfig
     */
    field[ProComponentConfigKey] = {
      type: 'ProDateMonthRange',
      ruleType: 'array',
      slots: computed(() => slots),
      fieldProps: compiledFieldProps,
      empty: computed(() => !isArray(value.value) || value.value.length <= 0),
    } as Partial<ProComponentConfig>

    const pickerProps = computed<DatePickerProps>(() => {
      return {
        type: 'monthrange',
        ref: pickerInstRef,
        value: value.value,
        formattedValue: undefined,
        onUpdateValue: doUpdateValue,
      }
    })

    const exposed: ProDateMonthRangeInstance = {
      blur: () => pickerInstRef.value?.blur(),
      focus: () => pickerInstRef.value?.focus(),
    }

    expose(exposed)
    return {
      stringPath,
      pickerSlots,
      pickerProps,
    }
  },
  render() {
    const {
      $props,
      $attrs,
      stringPath,
      pickerSlots,
      pickerProps,
    } = this

    return (
      <ProFormItem
        {...$props}
        path={stringPath}
        v-slots={{
          default: ({ fieldProps, placeholder }: any) => {
            const [sp, ep] = placeholder ?? []
            return (
              <NDatePicker
                {...$attrs}
                {...fieldProps}
                {...pickerProps}
                endPlaceholder={ep}
                startPlaceholder={sp}
                v-slots={pickerSlots}
              />
            )
          },
        }}
      >
      </ProFormItem>
    )
  },
})
</script>
