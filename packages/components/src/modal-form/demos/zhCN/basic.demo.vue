<markdown>
# 基本用法
</markdown>

<script lang="tsx">
import { random } from 'lodash-es'
import { useMessage } from 'naive-ui'
import { createProModalForm } from 'pro-components-naive-ui'
import { defineComponent, ref } from 'vue'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const message = useMessage()

    const modalForm = createProModalForm<Partial<{ name: string, password: string }>>({
      onSubmit: async (values) => {
        await delay(2000)
        message.success('更新成功')
        console.log(values)
        modalForm.close()
      },
    })

    const len = ref(2)

    function updateList() {
      len.value = random(2, 20)
    }

    return {
      len,
      updateList,
      form: modalForm,
      open: modalForm.open,
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
  <pro-modal-form
    :form="form"
    title="新建表单"
    preset="card"
    label-width="auto"
    label-placement="left"
  >
    <pro-input v-for="item in len" :key="item" title="用户名" path="name" />
    <n-button @click="updateList">
      更新动态高度
    </n-button>
  </pro-modal-form>
</template>
