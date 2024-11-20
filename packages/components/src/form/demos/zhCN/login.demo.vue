<markdown>
# 登录的例子
</markdown>

<script lang="tsx">
import { useMessage } from 'naive-ui'
import { createProForm } from 'pro-components-naive-ui'
import { defineComponent } from 'vue'

interface Info {
  tel: number
  password: string
}

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export default defineComponent({
  setup() {
    const message = useMessage()

    const form = createProForm<Info>({
      onSubmit: async (values) => {
        await delay(1000)
        console.log(values)
        message.success('登录成功')
      },
    })

    return {
      form,
      submiting: form.submiting,
    }
  },
})
</script>

<template>
  <div class="flex flex-col items-center">
    <h1>登录</h1>
    <pro-form class="w-50%" :form="form">
      <pro-input
        title="手机号"
        path="tel"
        required
        :rule="{
          pattern: /^1\d{10}$/,
          message: '请输入正确的手机号码',
        }"
      />
      <pro-input
        title="密码"
        path="password"
        required
        :rule="{
          min: 8,
          trim: true,
          message: '密码长度最少为8位',
        }"
      />
      <n-button block type="primary" :loading="submiting" attr-type="submit">
        {{ submiting ? '登录中...' : '登录' }}
      </n-button>
    </pro-form>
  </div>
</template>
