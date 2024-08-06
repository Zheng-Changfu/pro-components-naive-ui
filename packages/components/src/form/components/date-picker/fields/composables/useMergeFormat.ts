import type { DatePickerProps } from 'naive-ui'
import { enUS } from 'naive-ui'
import { computed, inject } from 'vue'

export function useMergeFormat(props: DatePickerProps) {
  const ns = 'DatePicker'
  const { type, format, valueFormat } = props
  const { mergedLocaleRef } = (inject('n-config-provider', null) ?? {}) as any

  return computed<string>(() => {
    const locale = mergedLocaleRef?.value?.[ns] ?? enUS[ns]

    if (valueFormat) {
      return valueFormat
    }
    if (format) {
      return format
    }
    switch (type) {
      case 'date':
      case 'daterange':
        return locale.dateFormat
      case 'datetime':
      case 'datetimerange':
        return locale.dateTimeFormat
      case 'year':
      case 'yearrange':
        return locale.yearTypeFormat
      case 'month':
      case 'monthrange':
        return locale.monthTypeFormat
      case 'quarter':
      case 'quarterrange':
        return locale.quarterFormat
      case 'week':
        return locale.weekFormat
    }
  })
}
