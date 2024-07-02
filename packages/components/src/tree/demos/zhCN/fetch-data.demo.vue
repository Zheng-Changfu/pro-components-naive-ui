<markdown>
# 请求数据

在 `fetch-config` 中配置请求函数，`expand-all-on-fetch-success` 控制请求成功后自动展开所有节点，`useProTree` 是用来控制 `tree` 组件的钩子
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
  if (!level)
    return []
  return repeat(6 - level, undefined).map(() => {
    return {
      label: createLabel(level),
      key: uid(),
      children: createData(level - 1),
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
      expand-all-on-fetch-success
      :fetch-config="{
        api,
        immediate: false,
      }"
    />
  </NFlex>
</template>
