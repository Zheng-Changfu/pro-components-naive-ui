<markdown>
# 异步获取数据
</markdown>

<script lang="tsx">
import { useProFormInst } from 'pro-components-naive-ui'
import { defineComponent, ref } from 'vue'

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

    const loading = ref(false)

    async function reqUserInfo() {
      loading.value = true
      await delay(1000)
      const result: Info = {
        name: 'zcf',
        userInfo: [
          { name: 'zcf', age: 18 },
        ],
      }
      restoreValidation() // 根据实际需求判断是否需要添加此代码，这里添加此行代码是有可能先点击提交触发校验，在点击获取数据需要清空校验
      setFieldsValue(result, 'overwrite') // 覆盖表单的所有数据，而不是合并
      setInitialValues(result, 'overwrite') // 将请求回来的值作为初始值，重置会回到初始值
      loading.value = false
      return result
    }

    return {
      instRef,
      loading,
      submit,
      reqUserInfo,
      restoreFieldsValue,
    }
  },
})
</script>

<template>
  <n-flex class="mb-8px">
    <n-button @click="reqUserInfo">
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
    <pro-form ref="instRef" @submit="console.log">
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
