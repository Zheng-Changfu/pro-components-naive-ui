<markdown>
# 基本用法
</markdown>

<script lang="tsx">
import { random } from 'lodash-es'
import { useMessage } from 'naive-ui'
import { createProDrawerForm } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const message = useMessage()

    const drawerForm = createProDrawerForm({
      onSubmit: async (values) => {
        await delay(1500)
        message.success('更新成功')
        console.log(values)
        drawerForm.close()
      },
    })

    const len = ref(2)

    function updateList() {
      len.value = random(2, 20)
    }

    return {
      len,
      updateList,
      form: drawerForm,
      open: drawerForm.open,
    }
  },
})
</script>

<template>
  <n-flex>
    <n-button type="primary" @click="open">
      新建表单
    </n-button>
  </n-flex>
  <pro-drawer-form
    :form="form"
    label-width="80"
    label-placement="left"
  >
    <pro-drawer-content
      title="新建表单"
      :native-scrollbar="false"
    >
      <n-button class="mb-12px" @click="updateList">
        更新动态高度
      </n-button>
      <pro-input
        v-for="(_, index) in len"
        :key="index"
        :title="`用户名-${index + 1}`"
        :path="`name-${index + 1}`"
      />
    </pro-drawer-content>
  </pro-drawer-form>
</template>
