<script lang='tsx'>
import type { SlotsType } from 'vue'
import { Fragment, computed, defineComponent, inject } from 'vue'
import { NFlex, formItemGiProps } from 'naive-ui'
import { omit } from 'lodash-es'
import { proFormContextKey } from '../../context'
import { ProFormItem } from '../form-item'
import { proFieldProps } from './props'
import type { ProFieldSlots } from './slots'
import { useParseProps } from './composables/useParseProps'
import { createField } from './composables/createField'
import { useMergeReadonly } from './composables/useMergeReadonly'
import { fieldExtraKey } from './keys'
import { useMergePlaceholder } from './composables/useMergePlaceholder'

const formItemGiKeys = Object.keys(formItemGiProps)
export default defineComponent({
  name: 'ProField',
  inheritAttrs: false,
  props: proFieldProps,
  slots: Object as SlotsType<ProFieldSlots>,
  setup(props, { slots }) {
    const field = createField(props)

    const {
      useFormItemGi,
      formItemRender,
    } = inject(proFormContextKey)!

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
      showLabel,
      labelWidth,
      labelAlign,
      labelProps,
      labelStyle,
      fieldProps,
      addonAfter,
      addonBefore,
      showFeedback,
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
      placeholder: parsedPlaceholder,
    } = useParseProps(field, props)

    const readonly = useMergeReadonly({
      readonly: parsedReadonly,
    })

    const placeholder = useMergePlaceholder({
      field,
      placeholder: parsedPlaceholder,
    })

    const fieldVModelProps = computed(() => {
      const name = valueModelName.value ?? 'value'
      const eventName = `onUpdate${name.slice(0, 1).toUpperCase()}${name.slice(1)}`
      return {
        [name]: value.value,
        [eventName]: doUpdateValue,
      }
    })

    const fieldBindProps = computed(() => {
      return {
        ...fieldProps.value,
        ...fieldVModelProps.value,
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
        showLabel: showLabel.value,
        labelWidth: labelWidth.value,
        labelAlign: labelAlign.value,
        labelProps: labelProps.value,
        labelStyle: labelStyle.value,
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

    field[fieldExtraKey] = {
      value,
      readonly,
      valueType,
      fieldProps: fieldBindProps,
      proFormItemProps: proFormItemBindProps,
      readonlyRender: slots.readonly ?? props.readonlyRender,
    }

    return {
      show,
      simple,
      addonAfter,
      addonBefore,
      placeholder,
      fieldBindProps,
      proFormItemBindProps,
      injectedFormItemRender: formItemRender,
    }
  },
  render() {
    const {
      show,
      simple,
      $props,
      $slots,
      addonAfter,
      addonBefore,
      placeholder,
      fieldBindProps,
      proFormItemBindProps,
      injectedFormItemRender,
    } = this

    if (!show) {
      return null
    }

    function renderField() {
      const fieldRender = $slots.field ?? $props.fieldRender
      const groupRender = $slots.group ?? $props.groupRender
      const addonAfterRender = $slots['addon-after'] ?? (() => addonAfter)
      const addonBeforeRender = $slots['addon-before'] ?? (() => addonBefore)
      const bindProps = placeholder === undefined
        ? fieldBindProps
        : { ...fieldBindProps, placeholder }

      const fieldVNode = fieldRender?.({
        bindProps,
        bindSlots: $slots,
      })

      if (!addonAfter && !addonBefore) {
        return fieldVNode
      }

      const vnode = (
        <Fragment>
          {addonBeforeRender()}
          {fieldVNode}
          {addonAfterRender()}
        </Fragment>
      )

      if (groupRender) {
        return groupRender({
          vnode,
        })
      }
      return (
        <NFlex
          wrap={false}
          style={{ width: '100%' }}
        >
          {vnode}
        </NFlex>
      )
    }

    if (simple) {
      // 简单模式下不包裹 ProFormItem
      return renderField()
    }

    function renderFormItem() {
      const formItemRender = $slots['form-item'] ?? $props.formItemRender ?? injectedFormItemRender
      if (formItemRender) {
        return formItemRender({
          bindSlots: {
            ...$slots,
            default: renderField,
          },
          bindProps: proFormItemBindProps,
        })
      }
      return (
        <ProFormItem
          {...proFormItemBindProps}
          v-slots={{
            ...$slots,
            default: renderField,
          }}
        />
      )
    }

    return renderFormItem()
  },
})
</script>
