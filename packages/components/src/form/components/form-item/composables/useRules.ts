import type { FormItemRule } from 'naive-ui'
import type { ProFormItemProps } from '../props'
import { isArray, toString } from 'lodash-es'
import { useInjectFieldContext } from 'pro-composables'
import { computed, unref } from 'vue'
import { useLocale } from '../../../../locales'
import { useInjectProFormContext } from '../../../context'
import { isEmptyValue } from '../../field/utils/valueUtil'

export function useRules(props: ProFormItemProps) {
  const {
    getMessage,
  } = useLocale('ProForm')

  const {
    validationTrigger,
  } = useInjectProFormContext()

  const {
    stringPath,
  } = useInjectFieldContext() ?? {}

  function requiredValidator(_: any, value: any) {
    return !isEmptyValue(value)
  }

  function requiredMessage() {
    const localeRequiredMessage = getMessage('validateMessages.required')
    const { title, label } = props
    return localeRequiredMessage(toString(title ?? label))
  }

  return computed(() => {
    const { rule, required } = props
    let normalizedRule = (isArray(rule) ? [...rule] : [rule].filter(Boolean)) as FormItemRule[]
    /**
     * 解决 naive-ui 如果需要为一个值为 number 类型的表项设定 required，需要在 rule 对象中设定 `type: 'number'` 的问题
     */
    if (required) {
      normalizedRule.push({
        required: true,
        validator: requiredValidator,
      })
    }
    normalizedRule = normalizedRule.map((rule) => {
      if (rule.required) {
        return {
          validator: requiredValidator,
          ...rule,
        }
      }
      return rule
    })

    return normalizedRule
      .map((rule) => {
        return {
        /**
         * 统一设置表单校验时机
         */
          trigger: unref(validationTrigger),
          /**
           * 统一设置必填的提示信息
           */
          message: requiredMessage,
          ...rule,
          /**
           * 给每个 rule 增加 key，方便 validate 方法校验
           */
          key: stringPath?.value,
        }
      })
  })
}
