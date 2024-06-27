<markdown>
# 操作

一些操作树方法的示例
</markdown>

<script lang="tsx">
import { repeat } from 'seemly'
import type { TreeOption } from 'naive-ui'
import { defineComponent } from 'vue'
import { uid, useProTree } from 'pro-components-naive-ui'

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
      disabled: Math.random() < 0.3,
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
    const [
      treeInstRef,
      {
        getLevelKeys,
        getEnabledKeys,
        setCheckedKeys,
        setExpandedKeys,
      },
    ] = useProTree()

    async function fetchTreeData() {
      await delay(1000)
      return createData()
    }

    return {
      treeInstRef,
      getLevelKeys,
      setCheckedKeys,
      getEnabledKeys,
      setExpandedKeys,
      api: fetchTreeData,
    }
  },
})
</script>

<template>
  <NFlex vertical>
    <NFlex>
      <NButton @click="setExpandedKeys(getLevelKeys(2))">
        展开2级
      </NButton>
      <NButton @click="setExpandedKeys(getLevelKeys(3))">
        展开3级
      </NButton>
      <NButton @click="setExpandedKeys()">
        全部展开
      </NButton>
      <NButton @click="setExpandedKeys([])">
        全部收起
      </NButton>
      <NButton @click="setCheckedKeys(getLevelKeys(2, false))">
        勾选所有二级节点
      </NButton>
      <NButton @click="setCheckedKeys(getEnabledKeys())">
        勾选全部节点（不包括禁用）
      </NButton>
      <NButton @click="setCheckedKeys()">
        勾选全部节点（包括禁用）
      </NButton>
    </NFlex>
    <ProTree ref="treeInstRef" checkable :fetch-config="{ api }" />
  </NFlex>
</template>
