<markdown>
# 懒加载数据

设置 `remote` 为 true，api 函数的调用时机为点击节点时，如果不能满足你的需求，你还是可以自己重写 `onLoad`
</markdown>

<script lang="tsx">
import type { TreeOption } from 'naive-ui'
import { defineComponent } from 'vue'
import { uid, useProTreeInstance } from 'pro-components-naive-ui'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

function nextLabel(currentLabel?: string): string {
  if (!currentLabel)
    return 'Out of Tao, One is born'
  if (currentLabel === 'Out of Tao, One is born')
    return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two')
    return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three') {
    return 'Out of Three, the created universe'
  }
  if (currentLabel === 'Out of Three, the created universe') {
    return 'Out of Tao, One is born'
  }
  return ''
}

let count = 0

export default defineComponent({
  setup() {
    const [treeInstRef, { getFetchControls }] = useProTreeInstance()

    async function fetchTreeData(node?: TreeOption) {
      count++
      await delay(1000)
      if (!node) {
        return [
          {
            label: nextLabel(),
            key: uid(),
            isLeaf: true,
            children: [],
          },
          {
            label: nextLabel(),
            key: uid(),
            isLeaf: false,
            children: [],
          },
        ]
      }
      return [
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label),
          isLeaf: count === 4,
          children: [],
        },
      ]
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
