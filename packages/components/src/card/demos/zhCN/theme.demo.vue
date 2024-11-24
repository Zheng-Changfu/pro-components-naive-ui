<markdown>
# 自定义竖条

可以通过主题重写竖条高度及颜色
</markdown>

<script lang="tsx">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      color: ref('#18A058'),
    }
  },
})
</script>

<template>
  <pro-config-provider>
    <n-flex vertical>
      <n-color-picker v-model:value="color" :show-alpha="false" />
      <pro-card title="小卡片" size="small">
        卡片内容
      </pro-card>
      <pro-card title="中卡片" size="medium">
        卡片内容
      </pro-card>
      <pro-card title="大卡片" size="large">
        卡片内容
      </pro-card>
      <pro-card title="超大卡片" size="huge">
        卡片内容
      </pro-card>
    </n-flex>
  </pro-config-provider>
</template>
