export enum ValueTypeEnum {
  RATE = 'rate',
  INPUT = 'input',
  DIGIT = 'digit',
  SLIDER = 'slider',
  SWITCH = 'switch',
  UPLOAD = 'upload',
  SELECT = 'select',
  PASSWORD = 'password',
  TEXTAREA = 'textarea',
  CHECKBOX = 'checkbox',
  TREE_SELECT = 'tree-select',

  DATE = 'date',
  TIME = 'time',
  DATE_TIME = 'date-time',
  DATE_YEAR = 'date-year',
  DATE_WEEK = 'date-week',
  DATE_MONTH = 'date-month',
  DATE_RANGE = 'date-range',
  DATE_QUARTER = 'date-quarter',
  DATE_TIME_RANGE = 'date-time-range',
  DATE_YEAR_RANGE = 'date-year-range',
  DATE_MONTH_RANGE = 'date-month-range',
  DATE_QUARTER_RANGE = 'date-quarter-range',

  FORM_LIST = 'form-list',
}

/**
 * 留给外面方便扩展自定义类型
 */
export type FieldValueType = `${ValueTypeEnum}`
