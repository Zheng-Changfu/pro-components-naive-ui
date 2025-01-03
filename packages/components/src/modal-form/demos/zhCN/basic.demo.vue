<markdown>
# 基本用法
</markdown>

<script lang="tsx">
import { random } from 'lodash-es'
import { useMessage } from 'naive-ui'
import { createProModalForm } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const loading = ref(false)
    const message = useMessage()

    const modalForm = createProModalForm({
      onSubmit: async (values) => {
        loading.value = true
        await delay(1500)
        message.success('更新成功')
        console.log(values)
        modalForm.close()
        loading.value = false
      },
    })

    const len = ref(2)

    function updateList() {
      len.value = random(2, 20)
    }

    return {
      len,
      loading,
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
    :loading="loading"
    title="新建表单"
    preset="card"
    label-width="80"
    label-placement="left"
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
  </pro-modal-form>
</template>
