<markdown>
# 结合表单

`open` 的第一个参数可以传递一个函数，这个函数会被 `nextTick` 包裹，你可以用来回填数据
</markdown>

<script lang="tsx">
import type { ProFormInst, ProModalInst } from 'pro-components-naive-ui'
import { useMessage } from 'naive-ui'
import { uid } from 'pro-components-naive-ui'

interface Row {
  id: string
  name: string
  age: number
  sex: 0 | 1
  avatar: string
}

export default defineComponent({
  setup() {
    const title = ref('')
    const message = useMessage()
    const instRef = ref<ProModalInst>()
    const formInstRef = ref<ProFormInst>()

    function add() {
      title.value = '新增'
      instRef.value!.open()
    }

    function edit(row: Row) {
      title.value = '编辑'
      instRef.value!.open(() => {
        formInstRef.value!.setFieldsValue(row)
      })
    }

    async function onSubmit(values: Omit<Row, 'id'>) {
      const id = formInstRef.value!.getFieldValue('id')
      console.log('id：', id)
      console.log('form：', values)
      await new Promise((resolve) => {
        setTimeout(resolve, 2000)
      })
      message.success(`${id ? '编辑' : '新增'}成功`)
      close()
    }

    return {
      title,
      instRef,
      formInstRef,
      add,
      edit,
      uid,
      onSubmit,
    }
  },
})
</script>

<template>
  <n-flex>
    <n-button @click="add">
      新增
    </n-button>
    <n-button
      @click="edit({
        id: uid(),
        name: 'zcf',
        age: 26,
        sex: 1,
        avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      })"
    >
      编辑
    </n-button>
  </n-flex>
  <pro-modal
    ref="instRef"
    :title="title"
    preset="card"
    class="w-600px"
  >
    <pro-form ref="formInstRef" label-placement="left" @submit="onSubmit">
      <pro-input title="姓名" path="name" />
      <pro-digit title="年龄" path="age" />
      <pro-radio-group
        title="性别"
        path="sex"
        :field-props="{
          options: [
            { label: '女', value: 0 },
            { label: '男', value: 1 },
          ] }"
      />
      <pro-upload title="头像" path="avatar" :field-props="{ listType: 'image-card' }" />
    </pro-form>
    <template #footer>
      <n-flex justify="end">
        <n-button @click="instRef?.close">
          关闭
        </n-button>
        <pro-button type="primary" @click="formInstRef?.submit">
          提交
        </pro-button>
      </n-flex>
    </template>
  </pro-modal>
</template>
