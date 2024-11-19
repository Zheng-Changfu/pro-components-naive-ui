<markdown>
# 基本用法
</markdown>

<script lang="tsx">
import { createProModalForm } from 'pro-components-naive-ui'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const modalForm = createProModalForm<Partial<{ name: string, password: string }>>({
      onSubmit: async (values) => {
        await delay(2000)
        console.log(values)
        modalForm.close()
      },
    })

    return {
      modalForm,
      open: modalForm.open,
    }
  },
})
</script>

<template>
  <n-flex>
    <n-button @click="open">
      新建表单
    </n-button>
  </n-flex>
  <pro-modal-form
    title="新建表单"
    preset="card"
    label-width="auto"
    label-placement="left"
    :modal-form="modalForm"
  >
    <pro-input title="用户名" path="name" />
    <pro-input title="用户名" path="name" />
    <pro-input title="用户名" path="name" />
    <pro-input title="用户名" path="name" />
    <pro-input title="用户名" path="name" />
    <pro-input title="用户名" path="name" />
    <pro-input title="用户名" path="name" />
    <pro-input title="用户名" path="name" />
    <pro-input title="用户名" path="name" />
    <pro-input title="用户名" path="name" />
    <pro-input title="用户名" path="name" />
    <pro-input title="用户名" path="name" />
    <pro-input title="用户名" path="name" />
    <pro-input title="用户名" path="name" />
    <pro-input title="用户名" path="name" />
    <pro-password title="密码" path="password" />
  </pro-modal-form>
</template>
