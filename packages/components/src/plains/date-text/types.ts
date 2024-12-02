export interface ProDateTextConfig {
  /**
   * @see https://date-fns.org/v3.6.0/docs/format
   * 格式化模式，默认支持几种常用格式
   * month = MMM
   * date = yyyy-MM-dd
   * quarter = yyyy-qqq
   * year = yyyy年(支持国际化)
   * week = YYYY-w周(支持国际化)
   * datetime = yyyy-MM-dd HH:mm:ss
   * 默认值为 datetime，你可以写 date-fns 支持的所有格式
   */
  pattern?: 'date' | 'datetime' | 'year' | 'month' | 'quarter' | 'week' | ({} & string)
}
