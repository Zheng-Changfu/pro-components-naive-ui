import { createLocale, enUS as nEnUS } from 'naive-ui'
import { type FieldValueType, ValueTypeEnum } from '../form'

export const enUS = createLocale({
  ProForm: {
    validateMessages: {
      required: (title: string) => {
        return `${title} Not Empty`
      },
    },
    fieldPlaceholder: (title: string, valueType: FieldValueType) => {
      switch (valueType) {
        case ValueTypeEnum.INPUT:
        case ValueTypeEnum.DIGIT:
        case ValueTypeEnum.PASSWORD:
          return `Please Input ${title}`
        case ValueTypeEnum.DATE:
        case ValueTypeEnum.TIME:
        case ValueTypeEnum.SELECT:
        case ValueTypeEnum.DATE_TIME:
        case ValueTypeEnum.DATE_YEAR:
        case ValueTypeEnum.DATE_WEEK:
        case ValueTypeEnum.DATE_MONTH:
        case ValueTypeEnum.TREE_SELECT:
        case ValueTypeEnum.DATE_QUARTER:
          return `Please Select ${title}`
        case ValueTypeEnum.DATE_RANGE:
        case ValueTypeEnum.DATE_TIME_RANGE:
          return ['Start Date', 'End Date']
        case ValueTypeEnum.DATE_YEAR_RANGE:
          return ['Start Year', 'End Year']
        case ValueTypeEnum.DATE_MONTH_RANGE:
          return ['Start Month', 'End Month']
        case ValueTypeEnum.DATE_QUARTER_RANGE:
          return ['Start Quarter', 'End Quarter']
      }
    },
  },
  ProFormList: {
    add: 'add',
    copyThisLine: 'copyThisLine',
    removeThisLine: 'removeThisLine',
  },
} as any, nEnUS)
