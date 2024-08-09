<markdown>
# 联动

`ProFormList` 包裹的组件有 `3个内置的变量`
1. $row：当前行数据，别名 $record
2. $index：当前行索引，别名 $rowIndex
3. $total：当前列表的总数
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProFormInst } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [instRef, { submit }] = useProFormInst()

    return {
      instRef,
      submit,
    }
  },
})
</script>

<template>
  <pro-form ref="instRef" @submit="console.log">
    <pro-form-list
      label="用户信息"
      path="userInfo"
      only-show-first-item-label
      :initial-value="[
        { name: 'zcf', age: 26 },
        { name: 'zzx', age: 0.5 },
        { name: 'cxh', age: 28 },
      ]"
      :creator-initial-value="() => ({ name: 'Name', age: 0 })"
    >
      <template #default="{ index, total }">
        <pro-input
          label="{{ '姓名-' + $index + 1 }}"
          path="name"
        />
        <pro-digit
          :label="`年龄-${index + 1}`"
          path="age"
        />
        <pro-input
          :label="`城市-${total}`"
          path="city"
          required
          visible="{{ !!$row.name }}"
        />
      </template>
    </pro-form-list>
    <n-button type="primary" @click="submit">
      提交
    </n-button>
  </pro-form>
</template>
