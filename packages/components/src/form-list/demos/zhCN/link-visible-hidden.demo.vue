<markdown>
# 联动-显示隐藏

使用实例或者 `row` 获取当前行的值控制联动
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-naive-ui'
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
        { name: 'cxh', age: 28 },
      ]"
      :creator-initial-value="() => ({ name: 'Name', age: 0 })"
    >
      <template #default="{ row, index, total, action }">
        <pro-input
          title="姓名"
          path="name"
        >
          <template #feedback="{ feedbackDom }">
            <div class="flex flex-col">
              <component :is="feedbackDom" />
              <span class="color-#00000073">输入26显示年龄</span>
              <span class="color-#00000073">输入bj显示城市</span>
            </div>
          </template>
        </pro-input>
        <pro-digit
          title="年龄"
          path="age"
          :visible="row.name === '26'"
          @change="() => row.aaa = 1"
        />
        <pro-input
          :title="`城市-${total}`"
          path="city"
          required
          :visible="action.get(index, 'name') === 'bj'"
        />
      </template>
    </pro-form-list>
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
