import { createLocale, zhCN as nZhCN } from 'naive-ui'
import type { FieldValueType } from '../form'
import { ValueTypeEnum } from '../form'

export const zhCN = createLocale({
  ProForm: {
    validateMessages: {
      required: (title: string) => {
        return `${title}不能为空`
      },
    },
    fieldPlaceholder: (title: string, valueType: FieldValueType) => {
      switch (valueType) {
        case ValueTypeEnum.INPUT:
        case ValueTypeEnum.DIGIT:
        case ValueTypeEnum.MENTION:
        case ValueTypeEnum.PASSWORD:
        case ValueTypeEnum.AUTO_COMPLETE:
          return `请输入${title}`
        case ValueTypeEnum.DATE:
        case ValueTypeEnum.TIME:
        case ValueTypeEnum.SELECT:
        case ValueTypeEnum.CASCADER:
        case ValueTypeEnum.DATE_TIME:
        case ValueTypeEnum.DATE_YEAR:
        case ValueTypeEnum.DATE_WEEK:
        case ValueTypeEnum.DATE_MONTH:
        case ValueTypeEnum.TREE_SELECT:
        case ValueTypeEnum.DATE_QUARTER:
          return `请选择${title}`
        case ValueTypeEnum.DATE_RANGE:
        case ValueTypeEnum.DATE_TIME_RANGE:
          return ['开始日期', '结束日期']
        case ValueTypeEnum.DATE_YEAR_RANGE:
          return ['开始年份', '结束年份']
        case ValueTypeEnum.DATE_MONTH_RANGE:
          return ['开始月份', '结束月份']
        case ValueTypeEnum.DATE_QUARTER_RANGE:
          return ['开始季度', '结束季度']
      }
    },
  },
  ProFormList: {
    add: '添加一行数据',
    copyThisLine: '复制此项',
    removeThisLine: '删除此项',
  },
  ProUpload: {
    title: '上传',
  },
} as any, nZhCN)
