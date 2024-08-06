<markdown>
# 表单列表嵌套联动

内部会自动处理路径，可以很方便的实现嵌套及联动
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { NCard } from 'naive-ui'
import type { ProFormListItemRender } from 'pro-components-naive-ui'
import { useProFormInst } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [instRef, {
      submit,
      restoreFieldsValue,
    }] = useProFormInst()

    function onSubmit(values: any) {
      console.log(values)
    }

    function itemRender(opt: Parameters<ProFormListItemRender>['0']) {
      const { index, itemVNode, actionVNode } = opt
      return (
        <NCard
          title={`标题${index + 1}`}
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
      instRef,
      submit,
      onSubmit,
      itemRender,
      restoreFieldsValue,
    }
  },
})
</script>

<template>
  <pro-form ref="instRef" @submit="onSubmit">
    <pro-input
      label="姓名"
      path="name"
      required
    />
    <pro-form-list
      label="用户信息"
      path="users"
      required
      :initial-value="[
        { name: 'zcf' },
      ]"
      :item-render="itemRender"
    >
      <n-flex>
        <pro-input
          label="姓名"
          name="name"
        />
        <pro-input
          label="昵称"
          name="nickName"
        />
      </n-flex>
      <pro-form-list
        label="用户信息"
        path="labels"
        required
        :item-render="itemRender"
        :copy-button-props="{
          tooltip: '复制',
        }"
        :remove-button-props="{
          tooltip: '不需要这行了',
        }"
      >
        <n-flex>
          <pro-input
            label="值"
            path="value"
          />
          <pro-input
            label="显示名称"
            path="label"
          />
        </n-flex>
      </pro-form-list>
    </pro-form-list>
    <n-flex>
      <n-button type="primary" @click="restoreFieldsValue">
        重置
      </n-button>
      <n-button type="primary" @click="submit">
        提交
      </n-button>
    </n-flex>
  </pro-form>
</template>
