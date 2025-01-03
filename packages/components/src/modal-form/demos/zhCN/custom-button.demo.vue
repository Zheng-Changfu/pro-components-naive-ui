<markdown>
# 自定义按钮
</markdown>

<script lang="tsx">
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

    const modalForm1 = createProModalForm({
      onSubmit: async (values) => {
        loading.value = true
        await delay(1500)
        message.success('更新成功')
        console.log(values)
        modalForm1.close()
        loading.value = false
      },
    })

    const modalForm2 = createProModalForm({
      onSubmit: async (values) => {
        loading.value = true
        await delay(1500)
        message.success('更新成功')
        console.log(values)
        modalForm2.close()
        loading.value = false
      },
    })

    const modalForm3 = createProModalForm()
    const modalForm4 = createProModalForm()

    return {
      loading,
      form1: modalForm1,
      form2: modalForm2,
      form3: modalForm3,
      form4: modalForm4,
      open1: modalForm1.open,
      open2: modalForm2.open,
      open3: modalForm3.open,
      open4: modalForm4.open,
    }
  },
})
</script>

<template>
  <n-flex>
    <n-button type="primary" @click="open1">
      自定义 footer 按钮
    </n-button>
    <n-button type="primary" @click="open2">
      自定义文字
    </n-button>
    <n-button type="primary" @click="open3">
      隐藏或修改按钮样式
    </n-button>
    <n-button type="primary" @click="open4">
      隐藏 footer
    </n-button>
  </n-flex>
  <pro-modal-form
    :form="form1"
    :loading="loading"
    title="新建表单"
    preset="card"
    label-width="80"
    label-placement="left"
  >
    <pro-input
      title="用户名"
      path="name"
    />
    <pro-digit
      title="年龄"
      path="age"
    />
    <template #footer="{ footerDom }">
      <n-flex justify="end" size="small">
        <component :is="footerDom" />
        <n-button @click="form1.submit()">
          ok
        </n-button>
      </n-flex>
    </template>
  </pro-modal-form>
  <pro-modal-form
    :form="form2"
    :loading="loading"
    title="新建表单"
    preset="card"
    label-width="80"
    label-placement="left"
    :reset-button-props="{
      content: '关闭',
      tooltip: '关闭弹窗',
    }"
    :submit-button-props="{
      content: '提交',
      tooltip: '提交表单',
    }"
  >
    <pro-input
      title="用户名"
      path="name"
    />
    <pro-digit
      title="年龄"
      path="age"
    />
  </pro-modal-form>
  <pro-modal-form
    :form="form3"
    :loading="loading"
    title="新建表单"
    preset="card"
    label-width="80"
    label-placement="left"
    :submit-button-props="false"
    :reset-button-props="{
      dashed: true,
    }"
  >
    <pro-input
      title="用户名"
      path="name"
    />
    <pro-digit
      title="年龄"
      path="age"
    />
  </pro-modal-form>
  <pro-modal-form
    :form="form4"
    title="新建表单"
    preset="card"
    label-width="80"
    label-placement="left"
    :footer="false"
  >
    <pro-input
      title="用户名"
      path="name"
    />
    <pro-digit
      title="年龄"
      path="age"
    />
  </pro-modal-form>
</template>
