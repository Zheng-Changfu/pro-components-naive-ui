<markdown>
# 后置状态钩子
在属性值即将变更时会触发该钩子，你可以用这个钩子返回一个新的值作为最终结果，在一些特殊场景下可能会用到，比如 `ProUpload` 组件自动增加 `id`<br/>
比如以下例子：选中全部后会将其他的值清空，反之同理
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProFormInstance } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [proFormInst, { submit }] = useProFormInstance()

    function onSubmit(values: any) {
      console.log(values, 'values')
    }

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
      submit,
      onSubmit,
      proFormInst,
      selectAllToClearOtherPostState,
    }
  },
})
</script>

<template>
  <pro-form
    ref="proFormInst"
    label-placement="left"
    label-width="auto"
    @submit="onSubmit"
  >
    <pro-select
      label="城市"
      path="city"
      required
      :post-state="selectAllToClearOtherPostState"
      :field-props="{
        multiple: true,
        options: [
          { label: '全部', value: 0 },
          { label: '上海', value: 1 },
          { label: '北京', value: 2 },
        ],
      }"
    />
    <n-button type="primary" @click="submit">
      登录
    </n-button>
  </pro-form>
</template>
