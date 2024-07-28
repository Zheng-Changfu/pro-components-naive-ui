import type { FieldExtraInfo } from '../../form'

export function builtInRenderPlaceholder(opt: FieldExtraInfo) {
  const { valueType, proFormItemProps } = opt
  const { title, label } = proFormItemProps.value
  const t = title ?? label
  /**
default: '{{`请输入${$label}`}}',
ProDate: '{{`请选择${$label}`}}',
ProTransfer: ['请输入', '请输入'],
ProSelect: '{{`请选择${$label}`}}',
ProDateYear: '{{`请选择${$label}`}}',
ProDateTime: '{{`请选择${$label}`}}',
ProDateWeek: '{{`请选择${$label}`}}',
ProDateMonth: '{{`请选择${$label}`}}',
ProDateRange: ['开始日期', '结束日期'],
ProTreeSelect: '{{`请选择${$label}`}}',
ProDateQuarter: '{{`请选择${$label}`}}',
ProDateYearRange: ['开始年份', '结束年份'],
ProDateMonthRange: ['开始月份', '结束月份'],
ProDateQuarterRange: ['开始季度', '结束季度'],
   */

  switch (valueType.value) {
    default:
      return `请输入${t}`
  }
}
