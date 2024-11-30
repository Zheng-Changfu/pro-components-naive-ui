<markdown>
# 基本用法
</markdown>

<script lang="tsx">
import { useMessage } from 'naive-ui'
import { createProDrawerForm } from 'pro-naive-ui'
import { defineComponent } from 'vue'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const message = useMessage()

    const drawerForm = createProDrawerForm<Partial<{ name: string, password: string }>>({
      onSubmit: async (values) => {
        await delay(2000)
        message.success('更新成功')
        console.log(values)
        drawerForm.close()
      },
    })
    return {
      form: drawerForm,
      open: drawerForm.open,
    }
  },
})
</script>

<template>
  <n-button @click="open">
    新建表单
  </n-button>
  <pro-drawer-form
    :form="form"
    label-width="auto"
    label-placement="left"
  >
    <pro-drawer-content title="新建表单" :native-scrollbar="false" closable>
      <pro-input title="用户名1" path="name1" />
      <pro-input title="用户名2" path="name2" />
    </pro-drawer-content>
  </pro-drawer-form>
</template>
