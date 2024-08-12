import { toString } from 'lodash-es'
import type { FieldExtraInfo } from '../../form'
import { ValueTypeEnum } from '../../form'

export function builtInRenderPlaceholder(opt: FieldExtraInfo): string | [string, string] | void {
  const { valueType, proFormItemProps } = opt
  const { title, label } = proFormItemProps.value
  const t = toString(title ?? label)
  const name = valueType.value!

  if ([
    ValueTypeEnum.INPUT,
    ValueTypeEnum.DIGIT,
    ValueTypeEnum.PASSWORD,
  ].includes(name)) {
    return `请输入${t}`
  }
  else if ([
    ValueTypeEnum.DATE,
    ValueTypeEnum.TIME,
    ValueTypeEnum.SELECT,
    ValueTypeEnum.DATE_TIME,
    ValueTypeEnum.DATE_YEAR,
    ValueTypeEnum.DATE_WEEK,
    ValueTypeEnum.DATE_MONTH,
    ValueTypeEnum.TREE_SELECT,
    ValueTypeEnum.DATE_QUARTER,
  ].includes(name)) {
    return `请选择${t}`
  }
  else if ([
    ValueTypeEnum.DATE_RANGE,
    ValueTypeEnum.DATE_TIME_RANGE,
  ].includes(name)) {
    return ['开始日期', '结束日期']
  }
  else if (name === ValueTypeEnum.DATE_YEAR_RANGE) {
    return ['开始年份', '结束年份']
  }
  else if (name === ValueTypeEnum.DATE_MONTH_RANGE) {
    return ['开始月份', '结束月份']
  }
  else if (name === ValueTypeEnum.DATE_QUARTER_RANGE) {
    return ['开始季度', '结束季度']
  }
}
