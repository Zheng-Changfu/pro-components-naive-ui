<script setup lang='tsx'>
import { NButton, NFlex, NIcon, NInput, inputProps } from 'naive-ui'
import { ref } from 'vue'
import { EyeInvisibleOutlined, EyeOutlined } from '@vicons/antd'
import type { ProPasswordSlots } from '../slots'
import { useProPasswordInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

defineOptions({
  name: 'ProFieldPassword',
  inheritAttrs: false,
})
defineProps(inputProps)
defineSlots<ProPasswordSlots>()

const open = ref(false)

const [
  instRef,
  methods,
] = useProPasswordInst()

const {
  empty,
  value,
  readonly,
  emptyText,
} = useReadonlyHelpers()

function setOpen(v: boolean) {
  open.value = v
}

defineExpose(methods)
</script>

<template>
  <slot
    v-if="readonly"
    name="readonly"
    v-bind="$props"
  >
    <template v-if="empty">
      {{ emptyText }}
    </template>
    <template v-else>
      <NFlex align="center" :wrap="false">
        {{ open ? value : '********' }}
        <NButton text type="primary" @click="setOpen(!open)">
          <NIcon :size="16">
            <component :is="open ? EyeOutlined : EyeInvisibleOutlined" />
          </NIcon>
        </NButton>
      </NFlex>
    </template>
  </slot>
  <NInput
    v-else
    ref="instRef"
    v-bind="{ ...$props, ...$attrs }"
  >
    <template v-for="(_, name) in $slots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NInput>
</template>
