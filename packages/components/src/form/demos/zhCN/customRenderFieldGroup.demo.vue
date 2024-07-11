<markdown>
# 自定义渲染控件组

控件组 = 当前控件 + 前缀后插槽
</markdown>

<script lang="tsx">
import type { VNodeChild } from 'vue'
import { defineComponent } from 'vue'
import { NInputGroup } from 'naive-ui'
import { useProFormInstance } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [instRef, { submit }] = useProFormInstance()

    function onSubmit(values: any) {
      console.log(values)
    }

    function renderFieldGroup(
      opt: { vnode: VNodeChild },
    ) {
      return <NInputGroup>{opt.vnode}</NInputGroup>
    }

    return {
      instRef,
      submit,
      onSubmit,
      renderFieldGroup,
    }
  },
})
</script>

<template>
  <pro-form
    ref="instRef"
    label-placement="left"
    label-width="auto"
    @submit="onSubmit"
  >
    <pro-input label="用户名" path="username" required :render-field-group="renderFieldGroup">
      <template #addon-before>
        <n-button type="primary">
          搜索
        </n-button>
      </template>
      <template #addon-after>
        <n-button>搜索</n-button>
      </template>
    </pro-input>
    <pro-password label="密码" path="password" required />
    <n-button type="primary" @click="submit">
      提交
    </n-button>
  </pro-form>
</template>
