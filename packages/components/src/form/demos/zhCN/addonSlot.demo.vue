<markdown>
# 前缀&后缀插槽

所有表单控件除了支持原有的插槽外，还新增了2个插槽，`addon-before` 和 `addon-after`
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return { }
  },
})
</script>

<template>
  <n-flex vertical>
    <pro-form label-width="auto" label-placement="left">
      <pro-input label="用户名" path="username">
        <template #addon-after>
          <n-button type="primary">
            搜索
          </n-button>
        </template>
      </pro-input>
      <pro-password label="密码" path="password">
        <template #addon-before>
          <div class="flex items-center">
            😁
          </div>
        </template>
      </pro-password>
      <pro-select
        label="下拉"
        path="select"
        class="w-200px"
        :field-props="{
          options: [
            {
              label: 'Drive My Car',
              value: 'song1',
            },
            {
              label: 'Norwegian Wood',
              value: 'song2',
            },
          ],
        }"
      >
        <template #addon-after>
          <div class="color-red flex items-center">
            牛马
          </div>
        </template>
      </pro-select>
      <pro-switch label="开关" path="switch">
        <template #addon-before>
          before...
        </template>
        <template #addon-after>
          after...
        </template>
      </pro-switch>
    </pro-form>
  </n-flex>
</template>
