import type { FieldValueType } from '../form'
import { createLocale, zhCN as nZhCN } from 'naive-ui'
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
        case ValueTypeEnum.IMAGE:
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
  ProCard: {
    collapseText: (collapsed: boolean) => collapsed ? '展开' : '收起',
  },
  ProSearchForm: {
    resetText: '重置',
    searchText: '查询',
    collapseText: (collapsed: boolean) => collapsed ? '展开' : '收起',
  },
  ProDataTable: {
    indexColumnText: '序号',
  },
} as any, nZhCN)
