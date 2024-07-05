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
  const compiledRule = useCompile(rule!, { scope })
  const compiledSize = useCompile(size!, { scope })
  const compiledLabel = useCompile(label!, { scope })
  const compiledFirst = useCompile(first!, { scope })
  const compiledSimple = useCompile(simple!, { scope })
  const compiledReadonly = useCompile(readonly!, { scope })
  const compiledRequired = useCompile(required!, { scope })
  const compiledFeedback = useCompile(feedback!, { scope })
  const compiledRulePath = useCompile(rulePath!, { scope })
  const compiledShowLabel = useCompile(showLabel!, { scope })
  const compiledLabelWidth = useCompile(labelWidth!, { scope })
  const compiledLabelAlign = useCompile(labelAlign!, { scope })
  const compiledLabelProps = useCompile(labelProps!, { scope })
  const compiledLabelStyle = useCompile(labelStyle!, { scope })
  const compiledShowFeedback = useCompile(showFeedback!, { scope })
  const compiledFeedbackClass = useCompile(feedbackClass!, { scope })
  const compiledFeedbackStyle = useCompile(feedbackStyle!, { scope })
  const compiledLabelPlacement = useCompile(labelPlacement!, { scope })
  const compiledShowRequireMark = useCompile(showRequireMark!, { scope })
  const compiledValidationStatus = useCompile(validationStatus!, { scope })
  const compiledIgnorePathChange = useCompile(ignorePathChange!, { scope })
  const compiledRequireMarkPlacement = useCompile(requireMarkPlacement!, { scope })

  const nFormItemProps = computed<FormItemProps>(() => {
    return {
      size: compiledSize.value,
      label: compiledLabel.value,
      first: compiledFirst.value,
      feedback: compiledFeedback.value,
      rulePath: compiledRulePath.value,
      showLabel: compiledShowLabel.value,
      labelWidth: compiledLabelWidth.value,
      labelAlign: compiledLabelAlign.value,
      labelProps: compiledLabelProps.value,
      labelStyle: compiledLabelStyle.value,
      showFeedback: compiledShowFeedback.value,
      feedbackClass: compiledFeedbackClass.value,
      feedbackStyle: compiledFeedbackStyle.value,
      labelPlacement: compiledLabelPlacement.value,
      showRequireMark: compiledShowRequireMark.value,
      validationStatus: compiledValidationStatus.value,
      ignorePathChange: compiledIgnorePathChange.value,
      requireMarkPlacement: compiledRequireMarkPlacement.value,
    }
  })

  return {
    nFormItemProps,
    rule: compiledRule,
    simple: compiledSimple,
    required: compiledRequired,
    readonly: compiledReadonly,
  }
}
