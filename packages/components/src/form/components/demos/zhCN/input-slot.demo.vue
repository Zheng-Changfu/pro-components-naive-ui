<markdown>
# 通用的 input 插槽

每个表单项都支持该插槽，你可以用来接入别的组件或自定义内容
</markdown>

<script lang="ts">
import { createProForm } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const form = createProForm({
      onSubmit: console.log,
    })
    return {
      form,
      readonly: ref(false),
    }
  },
})
</script>

<template>
  <n-switch v-model:value="readonly" class="mb-8px">
    <template #checked>
      编辑
    </template>
    <template #unchecked>
      只读
    </template>
  </n-switch>
  <pro-form :readonly="readonly" :form="form" label-placement="left" label-width="auto">
    <pro-input
      title="自定义 readonly 下的内容"
      path="custom-readonly"
      required
    >
      <template #input="{ inputDom, inputProps, readonly }">
        <div v-if="readonly" class="color-blue">
          {{ inputProps.value ? `🤣${inputProps.value}🤣` : '暂无数据' }}
        </div>
        <component :is="inputDom" v-else />
      </template>
    </pro-input>
    <pro-input
      title="接入 n-input 组件"
      path="usage-n-input"
      required
    >
      <template #input="{ inputDom, inputProps, readonly }">
        <component :is="inputDom" v-if="readonly" />
        <n-input v-else v-bind="inputProps" />
      </template>
    </pro-input>
    <pro-input
      title="没有动画的 extra"
      path="un-transition-extra"
      required
    >
      <template #input="{ inputDom }">
        <div class="flex flex-col">
          <component :is="inputDom" />
          <span class="color-#00000073 mt-4px ml-2px">extra 文案信息....</span>
        </div>
      </template>
    </pro-input>
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
