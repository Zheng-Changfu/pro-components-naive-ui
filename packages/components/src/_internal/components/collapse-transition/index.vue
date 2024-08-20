<script setup lang='tsx'>
import { collapseTransitionProps } from 'naive-ui'
import { useMountStyle } from '../../useMountStyle'
import ProFadeInExpandTransition from '../fade-in-expand-transition.vue'
import style from './styles/index.cssr'

/**
 * 没有用 n-collapse-transition，是因为内部用的 v-if
 * 这里专门给卡片使用，卡片的使用场景很多，这里默认为 v-show，后期看 issues 决定是否添加 `display-directive` 属性
 */
defineOptions({
  name: 'ProCollapseTransition',
  inheritAttrs: false,
})
defineProps(collapseTransitionProps)

useMountStyle(
  'ProCollapseTransition',
  'pro-collapse-transition',
  style,
)
</script>

<template>
  <ProFadeInExpandTransition :appear="$props.appear">
    <div
      v-show="$props.show"
      v-bind="$attrs"
      class="n-pro-collapse-transition"
    >
      <slot name="default" />
    </div>
  </ProFadeInExpandTransition>
</template>
