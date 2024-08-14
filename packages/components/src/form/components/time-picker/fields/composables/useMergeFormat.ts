import type { TimePickerProps } from 'naive-ui'
import { computed } from 'vue'
import { useLocale } from '../../../../../locales'

export function useMergeFormat(props: TimePickerProps) {
  const { format, valueFormat } = props
  const { localeRef } = useLocale('Time')

  return computed<string>(() => {
    const locale = localeRef.value
    if (valueFormat) {
      return valueFormat
    }
    if (format) {
      return format
    }
    return locale.dateFormat
  })
}
