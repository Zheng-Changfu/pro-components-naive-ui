<markdown>
# 组件使用方式

组件的方式用在描述列表中也不错
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<template>
  <n-descriptions title="描述" label-placement="left" bordered>
    <n-descriptions-item label="早餐">
      <pro-copyable-text value="lbr包子" :config="{ copiedDuring: 300 }" />
    </n-descriptions-item>
    <n-descriptions-item label="早午餐">
      <pro-date-text :value="Date.now()" />
    </n-descriptions-item>
    <n-descriptions-item label="午餐">
      <pro-images value="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" :config="{ width: 20 }" />
    </n-descriptions-item>
    <n-descriptions-item label="晚餐">
      <pro-tags :value="['晚餐', { content: 'yzc', type: 'error' }]" />
    </n-descriptions-item>
  </n-descriptions>
</template>
