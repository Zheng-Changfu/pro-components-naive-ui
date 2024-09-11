<markdown>
# 自定义表单项容器

表单项容器包括了当前表单项和前后缀插槽，默认内部使用了 `NFlex` 包裹，您可以使用表单项的 `group` 插槽自定义
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { NInputGroup } from 'naive-ui'

export default defineComponent({
  components: { NInputGroup },
})
</script>

<template>
  <pro-form
    label-placement="left"
    label-width="auto"
    @submit="console.log"
  >
    <pro-input
      title="用户名"
      path="username"
      required
    >
      <template #addon-before>
        <n-button type="primary">
          搜索
        </n-button>
      </template>
      <template #addon-after>
        <n-button>搜索</n-button>
      </template>
      <template #group="vnode">
        <NInputGroup>
          <component :is="vnode" />
        </NInputGroup>
      </template>
    </pro-input>
    <pro-password
      title="密码"
      path="password"
      required
    />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
