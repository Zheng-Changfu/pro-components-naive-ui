import type { FieldExtraInfo } from '../../form'

export function builtInRenderRequiredMessage(opt: FieldExtraInfo) {
  const { valueType, proFormItemProps } = opt
  const { title, label } = proFormItemProps.value
  const t = title ?? label
  /**
   * default: '{{`请输入${$label}`}}',
  ProDate: '{{`请选择${$label}`}}',
  ProSelect: '{{`请选择${$label}`}}',
  ProUpload: '{{`请上传${$label}`}}',
  ProDateYear: '{{`请选择${$label}`}}',
  ProDateTime: '{{`请选择${$label}`}}',
  ProDateWeek: '{{`请选择${$label}`}}',
  ProDateMonth: '{{`请选择${$label}`}}',
  ProDateRange: '{{`请选择${$label}`}}',
  ProTreeSelect: '{{`请选择${$label}`}}',
  ProDateQuarter: '{{`请选择${$label}`}}',
  ProDateYearRange: '{{`请选择${$label}`}}',
  ProDateMonthRange: '{{`请选择${$label}`}}',
  ProDateQuarterRange: '{{`请选择${$label}`}}',
   */

  switch (valueType.value) {
    default:
      return `请输入${t}`
  }
}
