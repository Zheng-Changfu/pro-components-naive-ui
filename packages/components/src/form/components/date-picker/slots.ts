import type { DatePickerProps } from 'naive-ui'
import type { ProFieldSharedSlots } from '../field'

export interface ProDatePickerSlots extends ProFieldSharedSlots<DatePickerProps> {
  'footer': any
  'prev-year': any
  'next-year': any
  'separator': any
  'date-icon': any
  'next-month': any
  'prev-month': any
}
