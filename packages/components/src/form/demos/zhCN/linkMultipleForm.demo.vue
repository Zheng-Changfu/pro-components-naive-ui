<markdown>
# 多表单联动

如果只是布局看起来像多个表单，可以将 `ProForm` 放在最外层，这里只是为了演示
</markdown>

<script lang="tsx">
import type { ProFormInst } from 'pro-components-naive-ui'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const aInstRef = ref<ProFormInst>()
    const bInstRef = ref<ProFormInst>()

    const scope = {
      $aForm: computed(() => aInstRef.value?.getScope()),
      $bForm: computed(() => bInstRef.value?.getScope()),
    }

    return {
      scope,
      aInstRef,
      bInstRef,
    }
  },
})
</script>

<template>
  <n-card :bordered="false" title="A表单">
    <pro-form ref="aInstRef" label-placement="left" label-width="auto" :scope="scope">
      <pro-input
        title="控制B表单input颜色"
        path="color"
        :field-props="{
          style: {
            background: '{{ $bForm?.$vals.color }}',
          },
        }"
      />
    </pro-form>
  </n-card>
  <n-card :bordered="false" title="B表单">
    <pro-form ref="bInstRef" label-placement="left" label-width="auto" :scope="scope">
      <pro-input
        title="控制A表单input颜色"
        path="color"
        :field-props="{
          style: {
            background: '{{ $aForm?.$vals.color }}',
          },
        }"
      />
    </pro-form>
  </n-card>
</template>
