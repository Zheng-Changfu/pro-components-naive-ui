<markdown>
# 拖拽行排序

拖拽功能是基于 [sortablejs](https://github.com/SortableJS/Sortable?tab=readme-ov-file#options) 实现的,我们并没有改动你的数据源，所以你需要在 `onEnd` (拖拽结束)后同步数据
</markdown>

<script lang="tsx">
import type { ProDataTableColumns, ProDataTableDragSortEnd } from 'pro-naive-ui'
import { AimOutlined } from '@vicons/antd'
import { NButton, NIcon } from 'naive-ui'
import { move } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

interface Song {
  no: number
  title: string
  length: string
}

export default defineComponent({
  setup() {
    const dragHandle = ref(true)

    const data = ref<Song[]>([
      { no: 3, title: 'Wonderwall', length: '4:18' },
      { no: 4, title: 'Don\'t Look Back in Anger', length: '4:48' },
      { no: 12, title: 'Champagne Supernova', length: '7:27' },
      { no: 33, title: 'Wonderwall', length: '4:18' },
      { no: 44, title: 'Don\'t Look Back in Anger', length: '4:48' },
      { no: 122, title: 'Champagne Supernova', length: '7:27' },
    ])

    const columns: ProDataTableColumns<Song> = [
      {
        path: 'dragSort',
      },
      {
        title: '自定义排序名称',
        path: 'dragSort',
        width: 160,
      },
      {
        title: '自定义渲染拖拽手柄',
        path: 'dragSort',
        width: 160,
        render() {
          return (
            <NButton text={true} class="cursor-grab align-middle">
              <NIcon size={16}>
                <AimOutlined />
              </NIcon>
            </NButton>
          )
        },
      },
      {
        title: '不依赖手柄',
        tooltip: '设置为 true 后再来拖拽',
        path: 'length',
      },
    ]

    /**
     * 你需要在这里同步数据源
     */
    function onDragSortEnd(event: Parameters<ProDataTableDragSortEnd>['0']) {
      const { newIndex, oldIndex } = event
      move(data.value, oldIndex, newIndex)
    }

    return {
      data,
      columns,
      dragHandle,
      onDragSortEnd,
    }
  },
})
</script>

<template>
  <pro-data-table
    :data="data"
    :columns="columns"
    :drag-sort-options="{
      columnPath: 'dragSort',
      // 为 false 则不限制为手柄拖拽
      handle: dragHandle ? undefined : false,
      onEnd: onDragSortEnd,
    }"
    :row-key="row => row.no"
  >
    <template #extra>
      <div>
        依赖手柄拖拽: <n-switch v-model:value="dragHandle" />
      </div>
    </template>
  </pro-data-table>
</template>
