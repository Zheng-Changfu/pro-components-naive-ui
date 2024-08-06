<markdown>
# 异步获取数据

可以使用自己封装的请求或者 `useProRequest` 轻松完成异步效果
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProFormInst, useProRequest } from 'pro-components-naive-ui'

interface Info {
  name: string
  userInfo: Array<{
    age: number
    name: string
  }>
}

function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export default defineComponent({
  setup() {
    const [instRef, {
      submit,
      setFieldsValue,
      setInitialValues,
      restoreFieldsValue,
      restoreValidation,
    }] = useProFormInst()

    const { run, loading } = useProRequest({
      api: reqUserInfo,
      immediate: false,
      onSuccess: (response) => {
        restoreValidation()
        setFieldsValue(response, 'overwrite')
        setInitialValues(response, 'overwrite') // 将请求回来的值作为初始值，重置会回到初始值
      },
    })

    async function reqUserInfo(): Promise<Info> {
      await delay(1000)
      return {
        name: 'zcf',
        userInfo: [
          { name: 'zcf', age: 18 },
        ],
      }
    }

    async function onSubmit(values: Info) {
      console.log(values)
    }

    return {
      run,
      instRef,
      loading,
      submit,
      onSubmit,
      restoreFieldsValue,
    }
  },
})
</script>

<template>
  <n-flex class="mb-8px">
    <n-button @click="run">
      请求
    </n-button>
    <n-button @click="restoreFieldsValue">
      重置
    </n-button>
    <n-button @click="submit">
      提交
    </n-button>
  </n-flex>
  <n-spin :show="loading">
    <pro-form ref="instRef" @submit="onSubmit">
      <pro-input
        label="姓名"
        path="name"
        required
      />
      <pro-form-list
        label="用户信息"
        path="userInfo"
        only-show-first-item-label
        required
      >
        <pro-input
          label="姓名"
          path="name"
          required
        />
        <pro-digit
          label="年龄"
          path="age"
          required
        />
      </pro-form-list>
    </pro-form>
  </n-spin>
</template>
