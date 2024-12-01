import type { PaginationInfo } from 'naive-ui'
import type { ProFieldColumnValueType } from '../form'
import { createLocale, zhCN as nZhCN } from 'naive-ui'
import { InternalValueTypeEnum } from '../form'

export const zhCN = createLocale({
  ProForm: {
    validateMessages: {
      required: (title: string) => {
        return `${title}不能为空`
      },
    },
    fieldPlaceholder: (title: string, valueType: ProFieldColumnValueType) => {
      /** TODO: */
      switch (valueType) {
        case InternalValueTypeEnum.INPUT:
        case InternalValueTypeEnum.DIGIT:
        case InternalValueTypeEnum.MENTION:
        case InternalValueTypeEnum.PASSWORD:
        case InternalValueTypeEnum.TEXTAREA:
        case InternalValueTypeEnum.AUTO_COMPLETE:
          return `请输入${title}`
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
          return `请选择${title}`
        case InternalValueTypeEnum.DATE_RANGE:
        case InternalValueTypeEnum.DATE_TIME_RANGE:
          return ['开始日期', '结束日期']
        case InternalValueTypeEnum.DATE_YEAR_RANGE:
          return ['开始年份', '结束年份']
        case InternalValueTypeEnum.DATE_MONTH_RANGE:
          return ['开始月份', '结束月份']
        case InternalValueTypeEnum.DATE_QUARTER_RANGE:
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
    collapse: (collapsed: boolean) => collapsed ? '展开' : '收起',
  },
  ProSwitch: {
    checked: '打开',
    unchecked: '关闭',
  },
  ProModalForm: {
    reset: '取 消',
    submit: '确 认',
  },
  ProDrawerContent: {
    reset: '取 消',
    submit: '确 认',
  },
  ProSearchForm: {
    reset: '重置',
    search: '查询',
    collapse: (collapsed: boolean) => collapsed ? '展开' : '收起',
  },
  ProDataTable: {
    sortColumn: '排序',
    indexColumn: '序号',
    settingDens: '密度',
    settingReset: '重置',
    settingReload: '刷新',
    settingColumn: '列设置',
    settingDensLarge: '宽松',
    settingDensSmall: '紧凑',
    settingDensMedium: '中等',
    settingShowColumn: '列展示',
    settingShowIndexColumn: '序号列',
    paginationPrefix: ({ itemCount }: PaginationInfo) => `共 ${itemCount} 条`,
  },
  ProEditDataTable: {
    add: '添加一行数据',
  },
  ProCopyableText: {
    copy: '复制',
    copied: '复制成功',
  },
} as any, nZhCN)
