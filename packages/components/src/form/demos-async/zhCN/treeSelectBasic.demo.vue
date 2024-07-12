<markdown>
# 树型选择异步数据源
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProTreeSelectInstance } from 'pro-components-naive-ui'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const [instRef, { getFetchControls }] = useProTreeSelectInstance()

    async function fetchOptions() {
      await delay(1000)
      return [
        {
          label: 'Rubber Soul',
          key: 'Rubber Soul',
          children: [
            {
              label:
                'Everybody\'s Got Something to Hide Except Me and My Monkey',
              key: 'Everybody\'s Got Something to Hide Except Me and My Monkey',
              children: [],
            },
            {
              label: 'Drive My Car',
              key: 'Drive My Car',
              disabled: true,
            },
            {
              label: 'Norwegian Wood',
              key: 'Norwegian Wood',
            },
            {
              label: 'You Won\'t See',
              key: 'You Won\'t See',
              disabled: true,
            },
            {
              label: 'Nowhere Man',
              key: 'Nowhere Man',
            },
            {
              label: 'Think For Yourself',
              key: 'Think For Yourself',
            },
            {
              label: 'The Word',
              key: 'The Word',
            },
            {
              label: 'Michelle',
              key: 'Michelle',
              disabled: true,
            },
            {
              label: 'What goes on',
              key: 'What goes on',
            },
            {
              label: 'Girl',
              key: 'Girl',
            },
            {
              label: 'I\'m looking through you',
              key: 'I\'m looking through you',
            },
            {
              label: 'In My Life',
              key: 'In My Life',
            },
            {
              label: 'Wait',
              key: 'Wait',
            },
          ],
        },
        {
          label: 'Let It Be',
          key: 'Let It Be Album',
          children: [
            {
              label: 'Two Of Us',
              key: 'Two Of Us',
            },
            {
              label: 'Dig A Pony',
              key: 'Dig A Pony',
            },
            {
              label: 'Across The Universe',
              key: 'Across The Universe',
            },
            {
              label: 'I Me Mine',
              key: 'I Me Mine',
            },
            {
              label: 'Dig It',
              key: 'Dig It',
            },
            {
              label: 'Let It Be',
              key: 'Let It Be',
            },
            {
              label: 'Maggie Mae',
              key: 'Maggie Mae',
            },
            {
              label: 'I\'ve Got A Feeling',
              key: 'I\'ve Got A Feeling',
            },
          ],
        },
      ]
    }

    return {
      instRef,
      fetchOptions,
      getFetchControls,
    }
  },
})
</script>

<template>
  <div>
    <pro-form>
      <pro-tree-select
        ref="instRef"
        label="树形选择"
        path="tree-select"
        :fetch-config="{
          immediate: false,
          api: fetchOptions,
        }"
      />
    </pro-form>
    <n-button
      type="primary"
      @click="getFetchControls().run()"
    >
      请求数据
    </n-button>
  </div>
</template>
