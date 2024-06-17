<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref, toRef } from 'vue'
import type { DatePickerInst, DatePickerProps } from 'naive-ui'
import { NDatePicker } from 'naive-ui'
import { createField, useCompile } from 'pro-components-hooks'
import dayjs from 'dayjs'
import { isString } from 'lodash-es'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useOmitSlots } from '../hooks/useOmitSlots'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { useInjectGlobalConfigContext } from '../config-provider'
import { proDateQuarterProps } from './props'
import type { ProDateQuarterSlots } from './slots'
import { proDateQuarterExtendSlotKeys } from './slots'
import type { ProDateQuarterInstance } from './inst'

dayjs.extend(quarterOfYear)
dayjs.extend(customParseFormat)
export default defineComponent({
  name: 'ProDateQuarter',
  props: proDateQuarterProps,
  slots: Object as SlotsType<ProDateQuarterSlots>,
  setup(props, { slots, expose }) {
    let shouldConvertValueOnTransform = false
    const pickerInstRef = ref<DatePickerInst>()
    const { proDateQuarter } = useInjectGlobalConfigContext()
    const pickerSlots = useOmitSlots(slots, proDateQuarterExtendSlotKeys)

    const proFieldProps = useGetProFieldProps(props)
    const field = createField({
      ...proFieldProps,
      defaultValue: null,
      transform: convertTimestampToString,
      postState: convertStringToTimestamp,
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
      return valueFormat ?? proDateQuarter.valueFormat
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

    /**
     * 注入自定义属性，在 pro-form-item 中完善 ProComponentConfig
     */
    field[ProComponentConfigKey] = {
      type: 'ProDateQuarter',
      ruleType: 'number',
      slots: computed(() => slots),
      fieldProps: compiledFieldProps,
      empty: computed(() => [null, undefined, ''].includes(value.value)),
    } as Partial<ProComponentConfig>

    const pickerProps = computed<DatePickerProps>(() => {
      return {
        type: 'quarter',
        ref: pickerInstRef,
        value: value.value,
        formattedValue: undefined,
        onUpdateValue: doUpdateValue,
      }
    })

    const exposed: ProDateQuarterInstance = {
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
            return (
              <NDatePicker
                {...$attrs}
                {...fieldProps}
                {...pickerProps}
                placeholder={placeholder}
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
