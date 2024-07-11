<markdown>
# 懒加载数据

设置 `remote` 为 true，api 函数的调用时机为点击节点时，如果不能满足你的需求，你还是可以自己重写 `onLoad`
</markdown>

<script lang="tsx">
import { repeat } from 'seemly'
import type { TreeOption } from 'naive-ui'
import { defineComponent } from 'vue'
import { uid, useProTreeInstance } from 'pro-components-naive-ui'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

function createData(level = 4): TreeOption[] | undefined {
  return repeat(6 - level, undefined).map(() => {
    return {
      label: createLabel(level),
      key: uid(),
      children: [],
    }
  })
}

function createLabel(level: number): string {
  if (level === 4)
    return '道生一'
  if (level === 3)
    return '一生二'
  if (level === 2)
    return '二生三'
  if (level === 1)
    return '三生万物'
  return ''
}

export default defineComponent({
  setup() {
    const [treeInstRef, { getFetchControls }] = useProTreeInstance()

    async function fetchTreeData() {
      await delay(1000)
      return createData()
    }

    return {
      treeInstRef,
      getFetchControls,
      api: fetchTreeData,
    }
  },
})
</script>

<template>
  <NFlex vertical>
    <ProButton @click="getFetchControls().run()">
      请求数据
    </ProButton>
    <ProTree
      ref="treeInstRef"
      remote
      :fetch-config="{
        api,
      }"
    />
  </NFlex>
</template>
