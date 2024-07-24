<markdown>
# 横向布局
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
          title={`规格${index + 1}`}
          embedded
          class="mb-8px"
          v-slots={{
            'default': () => itemVNode,
            'header-extra': () => actionVNode,
          }}
        />
      )
    }

    function nestItemRender(opt: Parameters<ProFormListItemRender>['0']) {
      const { itemVNode, actionVNode } = opt
      return (
        <div class="inline-flex me-25px">
          {itemVNode}
          <div class="ml-8px">{actionVNode}</div>
        </div>
      )
    }

    return {
      itemRender,
      nestItemRender,
    }
  },
})
</script>

<template>
  <pro-form label-placement="left">
    <pro-form-list
      label="规格信息"
      path="attributes"
      :min="1"
      :initial-value="[
        {
          name: '颜色',
          items: [
            { name: '红' },
            { name: '橙' },
          ],
        },
      ]"
      :creator-initial-value="() => ({
        name: '颜色',
        items: [
          { name: '红' },
          { name: '橙' },
        ],
      })"
      :item-render="itemRender"
      :copy-button-props="false"
      :creator-button-props="{
        content: '添加规格项',
      }"
    >
      <pro-input
        label="规格名"
        path="name"
      />
      <pro-form-list
        label="规格值"
        path="items"
        :min="1"
        :creator-button-props="{
          dashed: false,
          block: false,
          renderIcon: undefined,
          ghost: true,
          text: true,
          type: 'info',
          content: '新建',
        }"
        :copy-button-props="false"
        :remove-button-props="{
          tooltip: '删除',
        }"
        :item-render="nestItemRender"
      >
        <pro-input
          path="name"
          :field-props="{
            class: 'w-104px!',
          }"
        />
      </pro-form-list>
    </pro-form-list>
  </pro-form>
</template>
