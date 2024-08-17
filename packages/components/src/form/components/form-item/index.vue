<script setup lang='tsx'>
import { useInjectFieldContext } from 'pro-components-hooks'
import { computed, ref, useAttrs } from 'vue'
import { QuestionCircleOutlined } from '@vicons/antd'
import type { FormItemGiProps, FormItemInst, FormItemProps } from 'naive-ui'
import { NEl, NFormItem, NIcon, NTooltip } from 'naive-ui'
import { isArray } from 'lodash-es'
import { fieldExtraKey } from '../field'
import { proFormItemProps } from './props'
import type { ProFormItemSlots } from './slots'
import { useRules } from './composables/useRules'
import PatchInternalValidate from './components/patch-internal-validate.vue'

defineOptions({
  name: 'ProFormItem',
  inheritAttrs: false,
})
const props = defineProps(proFormItemProps)
defineSlots<ProFormItemSlots>()

const attrs = useAttrs()
const rules = useRules(props)
const field = useInjectFieldContext()
const nFormItemInst = ref<FormItemInst>()

const nFormItemProps = computed<FormItemProps | FormItemGiProps> (() => {
  const {
    label,
    title,
    tooltip,
    required,
    ...rest
  } = props
  return {
    ...attrs,
    ...rest,
    rule: rules.value,
    ref: nFormItemInst,
    label: title ?? label,
  }
})

const tooltips = computed(() => {
  const { tooltip } = props
  return (isArray(tooltip) ? tooltip : [tooltip]).filter(Boolean) as string[]
})

if (field) {
  field[fieldExtraKey] = {
    ...field[fieldExtraKey],
    proFormItemInst: nFormItemInst,
  }
}
</script>

<template>
  <NFormItem v-bind="nFormItemProps">
    <template v-if="$slots.feedback" #feedback>
      <slot name="feedback" />
    </template>
    <template #label>
      <NEl
        :style="{
          display: 'inline-flex',
          alignItems: 'center',
        }"
      >
        <slot name="label">
          {{ title ?? label }}
        </slot>
        <NTooltip v-if="tooltip || $slots.tooltip" trigger="hover">
          <template #trigger>
            <NIcon
              :size="16"
              :depth="3"
              :style="{
                cursor: 'help',
                marginInlineStart: '4px',
              }"
            >
              <QuestionCircleOutlined />
            </NIcon>
          </template>
          <slot name="tooltip">
            <NEl v-for="(t, i) in tooltips" :key="i + t">
              {{ t }}
            </NEl>
          </slot>
        </NTooltip>
      </NEl>
    </template>
    <PatchInternalValidate :rule="rules">
      <slot name="default" />
    </PatchInternalValidate>
  </NFormItem>
</template>
