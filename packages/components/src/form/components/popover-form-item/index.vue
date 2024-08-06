<script setup lang='tsx'>
import { computed, ref, useAttrs } from 'vue'
import { NEl, NPopover, useThemeVars } from 'naive-ui'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { ProFormItem } from '../form-item'
import { useFieldValidateStatus } from '../field'
import { proPopoverFormItemProps } from './props'
import type { ProPopoverFormItemSlots } from './slots'

defineOptions({
  name: 'ProPopoverFormItem',
  inheritAttrs: false,
})
const props = defineProps(proPopoverFormItemProps)
defineSlots<ProPopoverFormItemSlots>()

const attrs = useAttrs()
const clickInside = ref(true)
const formItemInstRef = ref()
const themeVars = useThemeVars()
const { errors, warnings } = useFieldValidateStatus()
const formItemEl = computed(() => formItemInstRef.value?.$el as HTMLElement)

const showPopover = computed(() => {
  const condition1 = !!clickInside.value
  const condition2 = !!errors.value.length || !!warnings.value.length
  return condition1 && condition2
})

const feedbackColor = computed(() => {
  const isErrorFeedback = errors.value.length > 0
  return isErrorFeedback
    ? themeVars.value.errorColor
    : themeVars.value.warningColor
})

const feedbacks = computed(() => {
  return errors.value.length > 0 ? errors.value : warnings.value
})

const proFormItemProps = computed(() => {
  const { popoverProps, ...rest } = props
  return {
    ...attrs,
    ...rest,
  }
})

onClickOutside(
  formItemEl,
  () => {
    clickInside.value = false
  },
)

useEventListener(
  formItemEl,
  'click',
  () => {
    clickInside.value = true
  },
  { capture: true },
)
</script>

<template>
  <NPopover
    placement="top-start"
    v-bind="popoverProps ?? {}"
    :show="showPopover"
  >
    <template #trigger>
      <ProFormItem ref="formItemInstRef" v-bind="proFormItemProps">
        <!-- 这里尽量让插槽类型变成静态，为了提示一丢丢性能 -->
        <slot name="label" />
        <slot name="tooltip" />
        <slot name="default" />
        <slot name="feedback" />
      </ProFormItem>
    </template>
    <NEl
      v-for="f in feedbacks"
      :key="f.message"
      :style="{ color: feedbackColor }"
    >
      {{ f.message }}
    </NEl>
  </NPopover>
</template>
