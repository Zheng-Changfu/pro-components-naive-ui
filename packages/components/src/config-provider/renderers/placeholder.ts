import { toString } from 'lodash-es'
import type { FieldExtraInfo } from '../../form'

export function builtInRenderPlaceholder(opt: FieldExtraInfo): string | [string, string] {
  const { valueType, proFormItemProps } = opt
  const { title, label } = proFormItemProps.value
  const t = toString(title ?? label)
  const name = valueType.value!

  switch (name) {
    case 'select':
    case 'date':
    case 'date-year':
    case 'date-time':
    case 'date-week':
    case 'date-month':
    case 'tree-select':
    case 'date-quarter':
      return `请选择${t}`
    case 'date-range':
      return ['开始日期', '结束日期']
    case 'date-year-range':
      return ['开始年份', '结束年份']
    case 'date-month-range':
      return ['开始月份', '结束月份']
    case 'date-quarter-range':
      return ['开始季度', '结束季度']
    default:
      return `请输入${t}`
  }
}
