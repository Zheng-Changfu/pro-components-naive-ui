import type { SlotsType } from 'vue'
import type { ProFieldSlots } from './slots'
import { NFlex } from 'naive-ui'
import { computed, defineComponent, Fragment } from 'vue'
import { ProFormItem } from '../form-item'
import { ProPopoverFormItem } from '../popover-form-item'
import { createField } from './composables/createField'
import { useMergeOptions } from './composables/useMergeOptions'
import { useParseProps } from './composables/useParseProps'
import { useValidationStatus } from './composables/useValidationStatus'
import { fieldExtraKey } from './keys'
import { proFieldProps } from './props'

export default defineComponent({
  name: 'ProField',
  inheritAttrs: false,
  props: proFieldProps,
  slots: Object as SlotsType<ProFieldSlots>,
  setup(props) {
    const field = createField(props)

    const {
      show,
      value,
      isList,
      stringPath,
      doUpdateValue,
    } = field

    const {
      size,
      rule,
      label,
      title,
      first,
      simple,
      tooltip,
      rulePath,
      feedback,
      required,
      valueType,
      labelWidth,
      labelAlign,
      labelProps,
      labelStyle,
      fieldProps,
      addonAfter,
      addonBefore,
      feedbackClass,
      feedbackStyle,
      valueModelName,
      labelPlacement,
      showRequireMark,
      ignorePathChange,
      validationStatus,
      attrs: parsedAttrs,
      requireMarkPlacement,
      readonly: parsedReadonly,
      showLabel: parsedShowLabel,
      placeholder: parsedPlaceholder,
      showFeedback: parsedShowFeedback,
      validateBehavior: parsedValidateBehavior,
      validateBehaviorProps: parsedValidateBehaviorProps,
    } = useParseProps(field, props)

    const {
      mergedTitle,
      mergedReadonly,
      mergedBehavior,
      mergedShowLabel,
      mergedPlaceholder,
      mergedBehaviorProps,
    } = useMergeOptions({
      title,
      label,
      field,
      valueType,
      readonly: parsedReadonly,
      showLabel: parsedShowLabel,
      placeholder: parsedPlaceholder,
      behavior: parsedValidateBehavior,
      behaviorProps: parsedValidateBehaviorProps as any,
    })

    const showFeedback = computed(() => {
      return parsedShowFeedback.value ?? mergedBehavior.value !== 'popover'
    })

    const fieldVModelProps = computed(() => {
      const name = valueModelName.value
      if (!name) {
        return {}
      }
      if (isList) {
        return {
          [name]: value.value,
        }
      }
      const eventName = `onUpdate${name.slice(0, 1).toUpperCase()}${name.slice(1)}`
      return {
        [name]: value.value,
        [eventName]: doUpdateValue,
      }
    })

    const fieldBindProps = computed(() => {
      if (mergedPlaceholder.value === undefined) {
        return {
          ...(fieldProps.value ?? {}),
          ...fieldVModelProps.value,
        }
      }
      return {
        ...(fieldProps.value ?? {}),
        ...fieldVModelProps.value,
        placeholder: mergedPlaceholder.value,
      }
    })

    const proFormItemBindProps = computed(() => {
      return {
        ...parsedAttrs.value,
        size: size.value,
        rule: rule.value,
        first: first.value,
        tooltip: tooltip.value,
        path: stringPath.value,
        rulePath: rulePath.value,
        feedback: feedback.value,
        title: mergedTitle.value,
        required: required.value,
        labelWidth: labelWidth.value,
        labelAlign: labelAlign.value,
        labelProps: labelProps.value,
        labelStyle: labelStyle.value,
        showLabel: mergedShowLabel.value,
        showFeedback: showFeedback.value,
        feedbackClass: feedbackClass.value,
        feedbackStyle: feedbackStyle.value,
        labelPlacement: labelPlacement.value,
        showRequireMark: showRequireMark.value,
        ignorePathChange: ignorePathChange.value,
        validationStatus: validationStatus.value,
        requireMarkPlacement: requireMarkPlacement.value,
      }
    })

    field[fieldExtraKey] = {
      valueType,
      readonly: mergedReadonly,
    }

    return {
      show,
      simple,
      addonAfter,
      addonBefore,
      fieldBindProps,
      mergedBehavior,
      mergedBehaviorProps,
      proFormItemBindProps,
      validationStatus: useValidationStatus(field),
    }
  },
  render() {
    if (!this.show) {
      return null
    }

    const renderFieldGroup = () => {
      const {
        $slots,
        addonAfter,
        addonBefore,
        fieldBindProps,
      } = this

      const groupRender = $slots.group
      const FieldComp = $slots.input?.(fieldBindProps)
      const addonAfterRender = $slots['addon-after'] ?? (() => addonAfter)
      const addonBeforeRender = $slots['addon-before'] ?? (() => addonBefore)

      if (
        !addonAfter
        && !addonBefore
        && !$slots['addon-after']
        && !$slots['addon-before']
      ) {
        return FieldComp
      }

      const FieldGroupComp = (
        <Fragment>
          {addonBeforeRender()}
          {FieldComp}
          {addonAfterRender()}
        </Fragment>
      )

      if (groupRender) {
        return groupRender(FieldGroupComp)
      }

      return (
        <NFlex
          wrap={false}
          align="center"
          size={[8, 0]}
          style={{ width: '100%' }}
        >
          {FieldGroupComp}
        </NFlex>
      )
    }

    if (this.simple) {
      // 简单模式下不包裹 ProFormItem
      return renderFieldGroup()
    }

    const {
      mergedBehavior,
      mergedBehaviorProps,
      proFormItemBindProps,
    } = this

    const proFormItemSlots = {
      label: this.$slots.label,
      feedback: this.$slots.feedback,
    }

    if (this.$slots.validation) {
      const formItemDom = (
        <ProFormItem
          {...proFormItemBindProps}
          showFeedback={false}
          v-slots={{
            ...proFormItemSlots,
            default: renderFieldGroup,
          }}
        />
      )

      const {
        errors,
        warnings,
        feedbacks,
        feedbackColor,
      } = this.validationStatus

      return this.$slots.validation({
        formItemDom,
        errors: errors.value,
        warnings: warnings.value,
        feedbacks: feedbacks.value,
        feedbackColor: feedbackColor.value,
      })
    }

    if (mergedBehavior === 'popover') {
      return (
        <ProPopoverFormItem
          {...proFormItemBindProps}
          popoverProps={mergedBehaviorProps}
          v-slots={{
            ...proFormItemSlots,
            default: renderFieldGroup,
          }}
        />
      )
    }

    return (
      <ProFormItem
        {...proFormItemBindProps}
        v-slots={{
          ...proFormItemSlots,
          default: renderFieldGroup,
        }}
      />
    )
  },
})
