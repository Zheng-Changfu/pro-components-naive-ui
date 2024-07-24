<markdown>
# 自定义列表和操作区域

使用 `item-render` 可以将列表和操作区域放在任意位置
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { NCard } from 'naive-ui'
import type { ProFormListItemRender } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    function itemRender(opt: Parameters<ProFormListItemRender>['0']) {
      const {
        total,
        index,
        action,
        itemVNode,
        actionVNode,
      } = opt
      console.log(total, index, action)
      return (
        <NCard
          title="卡片"
          embedded
          class="mb-8px"
          v-slots={{
            'default': () => itemVNode,
            'header-extra': () => actionVNode,
          }}
        />
      )
    }

    return {
      itemRender,
    }
  },
})
</script>

<template>
  <pro-form>
    <pro-form-list
      label="用户信息"
      path="userInfo"
      :item-render="itemRender"
      only-show-first-item-label
    >
      <n-flex>
        <pro-input
          label="姓名"
          path="name"
        />
        <pro-digit
          label="年龄"
          path="age"
        />
      </n-flex>
    </pro-form-list>
  </pro-form>
</template>
