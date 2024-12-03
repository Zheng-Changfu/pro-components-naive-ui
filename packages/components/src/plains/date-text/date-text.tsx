import type { PropType } from 'vue'
import type { ProDateTextConfig } from './types'
import { format } from 'date-fns'
import { isDate, isNumber, isString } from 'lodash-es'
import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../../_internal/useClsPrefix'
import { useOverrideProps } from '../../composables'
import { useLocale } from '../../locales'
import { usePlainComponentConfig } from '../composables'

const name = 'ProDateText'
export const ProDateText = defineComponent({
  name,
  props: {
    /**
     * 传递进来的值
     */
    value: undefined as unknown as PropType<any>,
    /**
     * 格式化配置
     */
    config: Object as PropType<ProDateTextConfig>,
  },
  setup(props) {
    const mergedClsPrefix = useNaiveClsPrefix()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const {
      localeRef,
    } = useLocale('DatePicker')

    const {
      empty,
      emptyText,
      mergedValue,
    } = usePlainComponentConfig('dateText', overridedProps)

    const pattern = computed(() => {
      const locale = localeRef.value
      const propPattern = props.config?.pattern ?? 'datetime'
      const builtinPatternMap: Record<Exclude<ProDateTextConfig['pattern'], undefined>, string> = {
        time: 'HH:mm:ss',
        date: locale.dateFormat,
        week: locale.weekFormat,
        year: locale.yearTypeFormat,
        month: locale.monthTypeFormat,
        quarter: locale.quarterFormat,
        datetime: locale.dateTimeFormat,
      }
      const format = builtinPatternMap[propPattern] as string | undefined
      return format ?? propPattern
    })

    /**
     * 支持字符串时间戳、时间戳、日期对象
     */
    const finalValue = computed(() => {
      const value = mergedValue.value
      if (isString(value)) {
        if (/^\d+$/.test(value)) {
          return format(Number(value), pattern.value, {
            useAdditionalWeekYearTokens: true,
          })
        }
        return value
      }
      if (isDate(value) || isNumber(value)) {
        return format(value, pattern.value, {
          useAdditionalWeekYearTokens: true,
        })
      }
    })

    return {
      empty,
      emptyText,
      finalValue,
      mergedClsPrefix,
    }
  },
  render() {
    if (this.empty) {
      return this.emptyText
    }
    return (
      <span class={[`${this.mergedClsPrefix}-pro-date-text`]}>
        {this.finalValue}
      </span>
    )
  },

})

export function renderDateText(value: any, config?: ProDateTextConfig) {
  return (
    <ProDateText
      value={value}
      config={config}
    />
  )
}