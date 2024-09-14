<script setup lang='tsx'>
import { computed } from 'vue'
import { DownOutlined, InfoCircleOutlined, UpOutlined } from '@vicons/antd'
import { NCard, NEl, NFlex, NIcon, NTooltip, collapseTransitionProps, useThemeVars } from 'naive-ui'
import { isArray, isFunction, omit } from 'lodash-es'
import { useOmitProps } from '../composables'
import { useMountStyle } from '../_internal/useMountStyle'
import ProCollapseTransition from '../_internal/components/collapse-transition/index.vue'
import { useLocale } from '../locales'
import { proCardExtendProps, proCardProps } from './props'
import type { ProCardSlots } from './slots'
import { useCollapseTransition } from './composables/useCollapseTransition'
import style from './styles/index.cssr'

defineOptions({
  name: 'ProCard',
})
const props = defineProps(proCardProps)
const slots = defineSlots<ProCardSlots>()

const theme = useMountStyle(
  'ProCard',
  'pro-card',
  style,
)

const themeVars = useThemeVars()
const { getMessage } = useLocale('ProCard')

const nCardProps = useOmitProps(props, {
  ...proCardExtendProps,
  ...collapseTransitionProps,
  title: props.title, // 忽略掉 title，自定义 title
})

const {
  show,
  nCollapseTransitionProps,
} = useCollapseTransition(props)

const showHeader = computed(() => {
  const { title, tooltip } = props
  return !!title || !!slots.header || !!tooltip
})

const cssVars = computed(() => {
  const { size } = props
  const {
    prefixHeightSmall = '16px',
    prefixHeightDefault = '18px',
    prefixBgColor = themeVars.value.errorColor,
  } = theme.value

  return {
    '--n-prefix-bg-color': prefixBgColor,
    '--n-prefix-height': size === 'small' ? prefixHeightSmall : prefixHeightDefault,
  }
})

const showSwitchArea = computed(() => {
  const { showSwitcher, closable } = props
  if (showSwitcher !== undefined) {
    return !!showSwitcher
  }
  return !closable
})

const collapseText = computed(() => {
  return getMessage('collapseText')(!show.value)
})

function triggerExpand(area: 'main' | 'arrow') {
  const { triggerAreas = [] } = props
  if (!triggerAreas.includes(area)) {
    return
  }
  show.value = !show.value
}

const Title = computed(() => {
  const { title } = props
  return isFunction(title) ? title : () => title
})

const inheritSlots = computed(() => {
  return omit(slots, [
    'switcher',
    'header-extra',
    'default',
    'header',
  ])
})

const mergedContentClass = computed(() => {
  return [
    'n-pro-card-content',
    props.contentClass ?? '',
    !show.value && 'n-pro-card-content__hidden',
  ].filter(Boolean).join(' ')
})

const tooltips = computed(() => {
  const { tooltip } = props
  if (!tooltip) {
    return []
  }
  return isArray(tooltip) ? tooltip : [tooltip]
})
</script>

<template>
  <NCard v-bind="nCardProps" :content-class="mergedContentClass">
    <template #default>
      <ProCollapseTransition v-bind="nCollapseTransitionProps">
        <slot name="default" />
      </ProCollapseTransition>
    </template>
    <template v-if="showHeader" #header>
      <NEl
        class="n-pro-card-header__main"
        :class="[
          $props.prefix && 'prefix',
          ($props.triggerAreas ?? []).includes('main') && 'triggerable',
        ]"
        :style="cssVars"
        @click="triggerExpand('main')"
      >
        <slot name="header">
          <component :is="Title" />
        </slot>
        <NTooltip v-if="tooltips.length > 0" trigger="hover">
          <template #trigger>
            <NIcon :size="18" class="n-pro-card-header__main__tooltip">
              <InfoCircleOutlined />
            </NIcon>
          </template>
          <NEl v-for="(t, i) in tooltips" :key="i">
            {{ t }}
          </NEl>
        </NTooltip>
      </NEl>
    </template>
    <template #header-extra>
      <slot name="header-extra" />
      <NFlex
        v-if="showSwitchArea"
        :size="[4, 0]"
        align="center"
        class="n-pro-card-header__extra"
        :class="[
          ($props.triggerAreas ?? []).includes('arrow') && 'triggerable',
        ]"
        @click="triggerExpand('arrow')"
      >
        <slot name="switcher" v-bind="{ expanded: show }">
          <NEl>{{ collapseText }}</NEl>
          <NIcon>
            <component :is="show ? UpOutlined : DownOutlined" />
          </NIcon>
        </slot>
      </NFlex>
    </template>
    <template v-for="(_, name) in inheritSlots" :key="name" #[name]="data">
      <slot :name="name" v-bind="data ?? {}" />
    </template>
  </NCard>
</template>
