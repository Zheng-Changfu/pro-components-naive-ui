import type { FormItemRule } from 'naive-ui'
import type { PropType } from 'vue'
import type { FormItemInternalValidateResult } from '../../../composables/useValidateResult'
import type { FieldExtraInfo } from '../../field'
import { useInjectFieldContext } from 'pro-components-hooks'
import { inject, onUnmounted, provide } from 'vue'
import { useInjectProFormContext } from '../../../context'
import { fieldExtraKey } from '../../field'

/**
 * 对表单项调用校验的方法打补丁，为了收集校验结果，实现错误信息自定义位置
 */
export default defineComponent({
  name: 'PatchInternalValidate',
  props: {
    rule: Array as PropType<FormItemRule[]>,
  },
  setup(props) {
    const field = useInjectFieldContext()!
    const nFormItem = inject('n-form-item')!
    const formContext = useInjectProFormContext()
    const formItemInstRef = (field?.[fieldExtraKey] as FieldExtraInfo)?.proFormItemInst

    function collectValidateResult(trigger: string, res: Partial<FormItemInternalValidateResult>) {
      const { errors, warnings } = res
      if (!field)
        return
      const path = field.stringPath.value

      const activeRules = (
        props.rule!.filter((rule) => {
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.includes(trigger)
          }
          else {
            return rule.trigger === trigger
          }
        })
      )
      if (!activeRules.length) {
        return
      }

      if (path && formContext) {
        formContext.clearValidationResults(path)
        formContext.addValidationErrors(path, errors)
        formContext.addValidationWarnings(path, warnings)
      }
    }

    function handleContentBlur(): void {
      formItemInstRef?.value
        ?.internalValidate('blur')
        .then(res => collectValidateResult('blur', res))
    }

    function handleContentChange(): void {
      formItemInstRef?.value
        ?.internalValidate('change')
        .then(res => collectValidateResult('change', res))
    }

    function handleContentFocus(): void {
      formItemInstRef?.value
        ?.internalValidate('focus')
        .then(res => collectValidateResult('focus', res))
    }

    function handleContentInput(): void {
      formItemInstRef?.value
        ?.internalValidate('input')
        .then(res => collectValidateResult('input', res))
    }

    provide('n-form-item', {
      ...nFormItem,
      handleContentBlur,
      handleContentChange,
      handleContentFocus,
      handleContentInput,
    })

    onUnmounted(() => {
      if (formContext && field) {
        formContext.clearValidationResults(field.stringPath.value)
      }
    })
  },
  render() {
    return this.$slots.default?.()
  },
})
