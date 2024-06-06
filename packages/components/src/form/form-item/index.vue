<script lang="tsx">
import { defineComponent, toRefs } from 'vue'
import { NFormItem } from 'naive-ui'
import { useCompile, useInjectFieldContext } from 'pro-components-hooks'
import { proFormItemProps } from './props'

export default defineComponent({
  name: 'ProFormItem',
  inheritAttrs: false,
  props: proFormItemProps,
  setup(props) {
    const {
      rule,
      size,
      label,
      first,
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
      path, // path 不支持表达式
      ...rest // 防止后续版本 naive-ui 增加了新的 props，为了向后兼容，但是不支持表达式
    } = toRefs(props)

    const { scope } = useInjectFieldContext()!
    /**
     * 每个属性单独使用 useCompile 编译，提高性能（缓存）
     */
    const compiledRule = useCompile(rule, { scope })
    const compiledSize = useCompile(size, { scope })
    const compiledLabel = useCompile(label, { scope })
    const compiledFirst = useCompile(first, { scope })
    const compiledFeedback = useCompile(feedback, { scope })
    const compiledRulePath = useCompile(rulePath, { scope })
    const compiledRequired = useCompile(required, { scope })
    const compiledShowLabel = useCompile(showLabel, { scope })
    const compiledLabelWidth = useCompile(labelWidth, { scope })
    const compiledLabelAlign = useCompile(labelAlign, { scope })
    const compiledLabelProps = useCompile(labelProps, { scope })
    const compiledLabelStyle = useCompile(labelStyle, { scope })
    const compiledShowFeedback = useCompile(showFeedback, { scope })
    const compiledFeedbackClass = useCompile(feedbackClass, { scope })
    const compiledFeedbackStyle = useCompile(feedbackStyle, { scope })
    const compiledLabelPlacement = useCompile(labelPlacement, { scope })
    const compiledShowRequireMark = useCompile(showRequireMark, { scope })
    const compiledValidationStatus = useCompile(validationStatus, { scope })
    const compiledIgnorePathChange = useCompile(ignorePathChange, { scope })
    const compiledRequireMarkPlacement = useCompile(requireMarkPlacement, { scope })

    return {
      path,
      restProps: rest,
      rule: compiledRule,
      size: compiledSize,
      label: compiledLabel,
      first: compiledFirst,
      feedback: compiledFeedback,
      rulePath: compiledRulePath,
      required: compiledRequired,
      showLabel: compiledShowLabel,
      labelWidth: compiledLabelWidth,
      labelAlign: compiledLabelAlign,
      labelProps: compiledLabelProps,
      labelStyle: compiledLabelStyle,
      showFeedback: compiledShowFeedback,
      feedbackClass: compiledFeedbackClass,
      feedbackStyle: compiledFeedbackStyle,
      labelPlacement: compiledLabelPlacement,
      showRequireMark: compiledShowRequireMark,
      validationStatus: compiledValidationStatus,
      ignorePathChange: compiledIgnorePathChange,
      requireMarkPlacement: compiledRequireMarkPlacement,
    }
  },
  render() {
    const {
      rule,
      size,
      label,
      path,
      first,
      feedback,
      rulePath,
      required,
      restProps,
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
    } = this
    return (
      <NFormItem
        rule={rule}
        path={path}
        size={size}
        label={label}
        first={first}
        feedback={feedback}
        rulePath={rulePath}
        required={required}
        showLabel={showLabel}
        labelWidth={labelWidth}
        labelAlign={labelAlign}
        labelProps={labelProps}
        labelStyle={labelStyle}
        showFeedback={showFeedback}
        feedbackClass={feedbackClass}
        feedbackStyle={feedbackStyle}
        labelPlacement={labelPlacement}
        showRequireMark={showRequireMark}
        validationStatus={validationStatus}
        ignorePathChange={ignorePathChange}
        requireMarkPlacement={requireMarkPlacement}
        {...restProps}
        v-slots={this.$slots}
      >
      </NFormItem>
    )
  },
})
</script>
