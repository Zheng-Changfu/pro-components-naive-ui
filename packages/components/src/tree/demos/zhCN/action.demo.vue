<markdown>
# 操作

部分操作树方法的示例
</markdown>

<script lang="tsx">
import type { TreeOption } from 'naive-ui'
import type { ProTreeInst } from 'pro-components-naive-ui'
import { repeat } from 'seemly'
import { defineComponent, ref } from 'vue'

function createData(level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level)
    return undefined
  return repeat(5 - level, undefined).map((_, index) => {
    const key = `${baseKey}${level}${index}`
    return {
      key,
      label: createLabel(level),
      disabled: Math.random() < 0.3,
      children: createData(level - 1, key),
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
    const data = ref(createData())
    const instRef = ref<ProTreeInst>()

    return {
      data,
      instRef,
    }
  },
})
</script>

<template>
  <NFlex vertical>
    <NFlex>
      <NButton @click="instRef?.setExpandedKeys(instRef?.getLevelKeys(2))">
        展开2级
      </NButton>
      <NButton @click="instRef?.setExpandedKeys(instRef?.getLevelKeys(3))">
        展开3级
      </NButton>
      <NButton @click="instRef?.setExpandedKeys()">
        全部展开
      </NButton>
      <NButton @click="instRef?.setExpandedKeys([])">
        全部收起
      </NButton>
      <NButton @click="instRef?.setCheckedKeys(instRef?.getLevelKeys(2, false))">
        勾选所有二级节点
      </NButton>
      <NButton @click="instRef?.setCheckedKeys(instRef?.getEnabledKeys())">
        勾选全部节点（不包括禁用）
      </NButton>
      <NButton @click="instRef?.setCheckedKeys()">
        勾选全部节点（包括禁用）
      </NButton>
    </NFlex>
    <ProTree ref="instRef" checkable :data="data" />
  </NFlex>
</template>
