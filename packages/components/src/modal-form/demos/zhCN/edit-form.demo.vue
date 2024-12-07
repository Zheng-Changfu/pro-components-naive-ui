<markdown>
# 编辑表单回显

你不需要等待表单挂载完成在进行赋值
</markdown>

<script lang="tsx">
import { useMessage } from 'naive-ui'
import { createProModalForm } from 'pro-naive-ui'
import { defineComponent } from 'vue'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const message = useMessage()

    const modalForm = createProModalForm<{ name: string, age: number }>({
      onSubmit: async (values) => {
        await delay(1500)
        message.success('更新成功')
        console.log(values)
        modalForm.close()
      },
    })

    function edit() {
      /**
       * 打开弹窗、赋值不需要考虑顺序问题
       */
      modalForm.setFieldsValue({
        name: 'zcf',
        age: 26,
      })
      modalForm.open()
    }

    return {
      edit,
      form: modalForm,
    }
  },
})
</script>

<template>
  <n-flex>
    <n-button type="primary" @click="edit">
      编辑表单回显
    </n-button>
  </n-flex>
  <pro-modal-form
    :form="form"
    title="新建表单"
    preset="card"
    label-width="80"
    label-placement="left"
  >
    <pro-input
      title="用户名"
      path="name"
      required
    />
    <pro-digit
      title="年龄"
      path="age"
      required
    />
  </pro-modal-form>
</template>
