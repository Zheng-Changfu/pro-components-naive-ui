import type { SlotsType } from 'vue'
import { Fragment, computed, defineComponent, h, inject, unref } from 'vue'
import { NEl, NFlex, formItemGiProps } from 'naive-ui'
import { omit, pick } from 'lodash-es'
import { proFormContextKey } from '../../context'
import { ProFormItem } from '../form-item'
import { ProPopoverFormItem } from '../popover-form-item'
import { useInjectGlobalConfig } from '../../../config-provider'
import { proFieldProps } from './props'
import type { ProFieldSlots } from './slots'
import { useParseProps } from './composables/useParseProps'
import { createField } from './composables/createField'
import { fieldExtraKey } from './keys'
import { useMergeOptions } from './composables/useMergeOptions'
import { useForwardInst } from './inst'

const formItemGiKeys = Object.keys(formItemGiProps)
export default defineComponent({
  name: 'ProField',
  inheritAttrs: false,
  props: proFieldProps,
  slots: Object as SlotsType<ProFieldSlots>,
  setup(props, { slots, expose }) {
    const [
      forwardInstRef,
      methods,
    ] = useForwardInst()

    const field = createField(props)
    const { fieldComponents } = useInjectGlobalConfig()
    const { useFormItemGi } = inject(proFormContextKey)!

    const {
      show,
      value,
      stringPath,
      doUpdateValue,
    } = field

    const {
      size,
      rule,
      span,
      label,
      title,
      first,
      suffix,
      simple,
      offset,
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
      mergedReadonly,
      mergedBehavior,
      mergedShowLabel,
      mergedPlaceholder,
      mergedBehaviorProps,
    } = useMergeOptions({
      field,
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
      const eventName = `onUpdate${name.slice(0, 1).toUpperCase()}${name.slice(1)}`
      return {
        [name]: value.value,
        [eventName]: doUpdateValue,
      }
    })

    const fieldBindProps = computed(() => {
      if (mergedPlaceholder.value === undefined) {
        return {
          ref: forwardInstRef,
          ...fieldProps.value,
          ...fieldVModelProps.value,
        }
      }
      return {
        ref: forwardInstRef,
        ...fieldProps.value,
        ...fieldVModelProps.value,
        placeholder: mergedPlaceholder.value,
      }
    })

    const gridItemProps = computed(() => {
      return {
        span: span.value,
        suffix: suffix.value,
        offset: offset.value,
      }
    })

    const proFormItemAttrs = computed(() => {
      return useFormItemGi.value
        ? parsedAttrs.value
        : omit(parsedAttrs.value, formItemGiKeys)
    })

    const proFormItemBindProps = computed(() => {
      return {
        ...proFormItemAttrs.value,
        size: size.value,
        rule: rule.value,
        label: label.value,
        title: title.value,
        first: first.value,
        tooltip: tooltip.value,
        path: stringPath.value,
        rulePath: rulePath.value,
        feedback: feedback.value,
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
        ...(useFormItemGi.value ? gridItemProps.value : {}),
      }
    })

    const fieldSlots = computed(() => {
      return omit(slots, ['label', 'tooltip', 'feedback'])
    })

    const proFormItemSlots = computed(() => {
      return pick(slots, ['label', 'tooltip', 'feedback'])
    })

    const FieldComponent = computed(() => {
      const { valueType } = props
      return unref(fieldComponents)[valueType as string]
    })

    field[fieldExtraKey] = {
      value,
      valueType,
      readonly: mergedReadonly,
      fieldProps: fieldBindProps,
      proFormItemProps: proFormItemBindProps,
    }

    expose(methods)
    return {
      show,
      simple,
      fieldSlots,
      addonAfter,
      addonBefore,
      fieldBindProps,
      mergedBehavior,
      FieldComponent,
      proFormItemSlots,
      mergedBehaviorProps,
      proFormItemBindProps,
    }
  },
  render() {
    const {
      show,
      simple,
      $slots,
      addonAfter,
      addonBefore,
      fieldBindProps,
      mergedBehavior,
      mergedBehaviorProps,
      proFormItemBindProps,
    } = this

    const renderFieldGroup = () => {
      const groupRender = $slots.group
      const FieldComp = h(this.FieldComponent, fieldBindProps, this.fieldSlots)
      const addonAfterRender = $slots['addon-after'] ?? (() => <NEl>{addonAfter}</NEl>)
      const addonBeforeRender = $slots['addon-before'] ?? (() => <NEl>{addonBefore}</NEl>)

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

    if (!show) {
      return null
    }

    if (simple) {
      // 简单模式下不包裹 ProFormItem
      return renderFieldGroup()
    }

    if (mergedBehavior === 'popover') {
      return (
        <ProPopoverFormItem
          {...proFormItemBindProps}
          popoverProps={mergedBehaviorProps}
          v-slots={{
            ...this.proFormItemSlots,
            default: renderFieldGroup,
          }}
        />
      )
    }

    return (
      <ProFormItem
        {...proFormItemBindProps}
        v-slots={{
          ...this.proFormItemSlots,
          default: renderFieldGroup,
        }}
      />
    )
  },
})
