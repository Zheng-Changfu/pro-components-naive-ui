import type { FormItemRule } from 'naive-ui'
import type { ProFormItemProps } from '../props'
import { isArray, toString } from 'lodash-es'
import { useInjectField } from 'pro-composables'
import { computed, unref } from 'vue'
import { isEmptyValue } from '../../../../_utils/isEmptyValue'
import { useLocale } from '../../../../locales'
import { useInjectProFormConfig } from '../../../context'
import { fieldExtraKey } from '../../field/field-extra-info'

export function useRules(props: ProFormItemProps) {
  const {
    getMessage,
  } = useLocale('ProForm')

  const {
    validationTrigger,
  } = useInjectProFormConfig()

  const field = useInjectField()

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
      const { required } = rule
      if (required) {
        return {
          ...rule,
          validator: requiredValidator,
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
          key: field ? field.stringPath.value : '',
          /**
           * 给每个 rule 增加 readonly，方便 validate 方法过滤
           */
          readonly: field ? field[fieldExtraKey].readonly.value : false,
        }
      })
  })
}
