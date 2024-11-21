<markdown>
# 联动

`ProFormList` 包裹的组件有 `3个内置的变量`
1. $row：当前行数据，别名 $record
2. $index：当前行索引，别名 $rowIndex
3. $total：当前列表的总数
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-components-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      form: createProForm({
        onSubmit: console.log,
      }),
    }
  },
})
</script>

<template>
  <pro-form :form="form">
    <pro-form-list
      title="用户信息"
      path="userInfo"
      only-show-first-item-label
      :initial-value="[
        { name: 'zcf', age: 26 },
        { name: 'zzx', age: 0.5 },
        { name: 'cxh', age: 28 },
      ]"
      :creator-initial-value="() => ({ name: 'Name', age: 0 })"
    >
      <template #default="{ index, total, action }">
        <pro-input
          :title="`姓名-${index + 1}`"
          path="name"
        />
        <pro-digit
          :title="`年龄-${index + 1}`"
          path="age"
        />
        <pro-input
          :title="`城市-${total}`"
          path="city"
          required
          :visible="!!action.get(index, 'name')"
        />
      </template>
    </pro-form-list>
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
