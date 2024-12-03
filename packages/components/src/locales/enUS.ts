import type { PaginationInfo } from 'naive-ui'
import type { ProFieldColumnValueType } from '../form'
import { createLocale, enUS as nEnUS } from 'naive-ui'
import { InternalValueTypeEnum } from '../form/components/field/enums'

export const enUS = createLocale({
  ProForm: {
    validateMessages: {
      required: (title: string) => {
        return `${title} Not Empty`
      },
    },
    fieldPlaceholder: (title: string, valueType: ProFieldColumnValueType) => {
      /** TODO: */
      switch (valueType) {
        case InternalValueTypeEnum.INPUT:
        case InternalValueTypeEnum.DIGIT:
        case InternalValueTypeEnum.MENTION:
        case InternalValueTypeEnum.PASSWORD:
        case InternalValueTypeEnum.AUTO_COMPLETE:
          return `Please Input ${title}`
        case InternalValueTypeEnum.DATE:
        case InternalValueTypeEnum.TIME:
        case InternalValueTypeEnum.SELECT:
        case InternalValueTypeEnum.CASCADER:
        case InternalValueTypeEnum.DATE_TIME:
        case InternalValueTypeEnum.DATE_YEAR:
        case InternalValueTypeEnum.DATE_WEEK:
        case InternalValueTypeEnum.DATE_MONTH:
        case InternalValueTypeEnum.TREE_SELECT:
        case InternalValueTypeEnum.DATE_QUARTER:
          return `Please Select ${title}`
        case InternalValueTypeEnum.DATE_RANGE:
        case InternalValueTypeEnum.DATE_TIME_RANGE:
          return ['Start Date', 'End Date']
        case InternalValueTypeEnum.DATE_YEAR_RANGE:
          return ['Start Year', 'End Year']
        case InternalValueTypeEnum.DATE_MONTH_RANGE:
          return ['Start Month', 'End Month']
        case InternalValueTypeEnum.DATE_QUARTER_RANGE:
          return ['Start Quarter', 'End Quarter']
      }
    },
  },
  ProFormList: {
    add: 'add',
    copyThisLine: 'copyThisLine',
    removeThisLine: 'removeThisLine',
  },
  ProUpload: {
    title: 'Upload',
  },
  ProCard: {
    collapse: (collapsed: boolean) => collapsed ? 'uncollapsed' : 'collapsed',
  },
  ProSwitch: {
    checked: 'open',
    unchecked: 'close',
  },
  ProModalForm: {
    reset: 'reset',
    submit: 'submit',
  },
  ProDrawerContent: {
    reset: 'reset',
    submit: 'submit',
  },
  ProSearchForm: {
    reset: 'reset',
    search: 'search',
    collapse: (collapsed: boolean) => collapsed ? 'uncollapsed' : 'collapsed',
  },
  ProDataTable: {
    sortColumn: 'sort',
    settingDens: 'dens',
    indexColumn: 'Index',
    settingReset: 'reset',
    settingReload: 'reload',
    settingDensLarge: 'large',
    settingDensSmall: 'small',
    settingDensMedium: 'medium',
    settingColumn: 'columnSetting',
    settingShowColumn: 'showColumn',
    settingShowIndexColumn: 'showIndexColumn',
    paginationPrefix: ({ itemCount }: PaginationInfo) => `Total is ${itemCount}.`,
  },
  ProEditDataTable: {
    add: 'add',
  },
  ProCopyableText: {
    copy: 'copy',
    copied: 'copied',
  },
} as any, nEnUS)
