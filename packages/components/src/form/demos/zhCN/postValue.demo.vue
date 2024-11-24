<markdown>
# 后置状态钩子
在属性值即将变更时会触发该钩子，你可以用这个钩子返回一个新的值作为最终结果，在一些特殊场景下可能会用到，比如 `ProUpload` 组件自动增加 `id`<br/>
比如以下例子：选中全部后会将其他的值清空，反之同理
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    function selectAllToClearOtherPostState(val: number[] | null) {
      if (!val) {
        return val
      }
      const fistCity = val[0]
      const lastCity = val[val.length - 1]
      if (lastCity === 0) {
        return [lastCity]
      }
      return fistCity === 0 ? val.slice(1) : val
    }

    return {
      selectAllToClearOtherPostState,
      form: createProForm({
        onSubmit: console.log,
      }),
    }
  },
})
</script>

<template>
  <pro-form
    :form="form"
    label-width="auto"
    label-placement="left"
  >
    <pro-select
      title="城市"
      path="city"
      required
      :post-value="selectAllToClearOtherPostState"
      :field-props="{
        multiple: true,
        options: [
          { label: '全部', value: 0 },
          { label: '上海', value: 1 },
          { label: '北京', value: 2 },
        ],
      }"
    />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
