<markdown>
# 树型选择懒加载数据源

设置 `fieldProps.remote` 为 true，点击节点时才会触发请求，如果不满足你的需求，你可以自定义 `onLoad`
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import type { TreeSelectOption } from 'naive-ui'
import { uid } from 'pro-components-hooks'

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
    async function fetchOptions(option: TreeSelectOption) {
      console.log(option, 'option')
      count++
      await delay(1000)
      if (!option) {
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
          label: nextLabel(option.label),
          key: option.key + nextLabel(option.label),
          isLeaf: count === 4,
          children: [],
        },
      ]
    }

    return {
      fetchOptions,
    }
  },
})
</script>

<template>
  <pro-form>
    <pro-tree-select
      label="树形选择"
      path="tree-select"
      :field-props="{
        remote: true,
        multiple: true,
        checkable: true,
      }"
      :fetch-config="{
        api: fetchOptions,
      }"
    />
  </pro-form>
</template>
