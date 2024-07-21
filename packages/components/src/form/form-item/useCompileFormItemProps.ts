import { computed, toRefs } from 'vue'
import { useCompile, useInjectFieldContext } from 'pro-components-hooks'
import type { FormItemProps } from 'naive-ui'
import type { ProFormItemProps } from './props'

export function useCompileFormItemProps(
  props: ProFormItemProps,
) {
  const {
    rule,
    size,
    label,
    first,
    simple,
    readonly,
    feedback,
    rulePath,
    required,
    showLabel,
    labelWidth,
    labelAlign,
    labelProps,
    labelStyle,
    showFeedback,
    formItemClass,
    formItemStyle,
    feedbackClass,
    feedbackStyle,
    labelPlacement,
    showRequireMark,
    validationStatus,
    ignorePathChange,
    requireMarkPlacement,
  } = toRefs(props)

  const {
    scope,
  } = useInjectFieldContext()!

  /**
   * 每个属性单独使用 useCompile 编译，提高性能（缓存）
   */
  const parsedRule = useCompile(rule!, { scope })
  const parsedSize = useCompile(size!, { scope })
  const parsedLabel = useCompile(label!, { scope })
  const parsedFirst = useCompile(first!, { scope })
  const parsedSimple = useCompile(simple!, { scope })
  const parsedReadonly = useCompile(readonly!, { scope })
  const parsedRequired = useCompile(required!, { scope })
  const parsedFeedback = useCompile(feedback!, { scope })
  const parsedRulePath = useCompile(rulePath!, { scope })
  const parsedShowLabel = useCompile(showLabel!, { scope })
  const parsedLabelWidth = useCompile(labelWidth!, { scope })
  const parsedLabelAlign = useCompile(labelAlign!, { scope })
  const parsedLabelProps = useCompile(labelProps!, { scope })
  const parsedLabelStyle = useCompile(labelStyle!, { scope })
  const parsedShowFeedback = useCompile(showFeedback!, { scope })
  const parsedFeedbackClass = useCompile(feedbackClass!, { scope })
  const parsedFeedbackStyle = useCompile(feedbackStyle!, { scope })
  const parsedFormItemStyle = useCompile(formItemStyle!, { scope })
  const parsedFormItemClass = useCompile(formItemClass!, { scope })
  const parsedLabelPlacement = useCompile(labelPlacement!, { scope })
  const parsedShowRequireMark = useCompile(showRequireMark!, { scope })
  const parsedValidationStatus = useCompile(validationStatus!, { scope })
  const parsedIgnorePathChange = useCompile(ignorePathChange!, { scope })
  const parsedRequireMarkPlacement = useCompile(requireMarkPlacement!, { scope })

  const nFormItemProps = computed<FormItemProps>(() => {
    return {
      size: parsedSize.value,
      label: parsedLabel.value,
      first: parsedFirst.value,
      feedback: parsedFeedback.value,
      rulePath: parsedRulePath.value,
      class: parsedFormItemClass.value,
      style: parsedFormItemStyle.value,
      showLabel: parsedShowLabel.value,
      labelWidth: parsedLabelWidth.value,
      labelAlign: parsedLabelAlign.value,
      labelProps: parsedLabelProps.value,
      labelStyle: parsedLabelStyle.value,
      showFeedback: parsedShowFeedback.value,
      feedbackClass: parsedFeedbackClass.value,
      feedbackStyle: parsedFeedbackStyle.value,
      labelPlacement: parsedLabelPlacement.value,
      showRequireMark: parsedShowRequireMark.value,
      validationStatus: parsedValidationStatus.value,
      ignorePathChange: parsedIgnorePathChange.value,
      requireMarkPlacement: parsedRequireMarkPlacement.value,
    }
  })

  return {
    nFormItemProps,
    rule: parsedRule,
    simple: parsedSimple,
    required: parsedRequired,
    readonly: parsedReadonly,
  }
}
