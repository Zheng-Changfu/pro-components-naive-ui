<markdown>
# 表单部分Api

如果你想跨组件使用（Form 在顶层，其他表单控件在后代组件中）Api，请在后代组件中使用 `useInjectProFormInst` 方法注入表单实例
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-naive-ui'
import { defineComponent } from 'vue'

interface Info {
  digit: number
  select: string
  switch: boolean
  username: string
  password: string
}

export default defineComponent({
  setup() {
    const form = createProForm<Info>({
      onSubmit: console.log,
    })

    const {
      submit,
      validate,
      matchPath,
      getFieldValue,
      setFieldValue,
      getFieldsValue,
      setFieldsValue,
      resetFieldValue,
      setInitialValue,
      resetFieldsValue,
      setInitialValues,
      restoreValidation,
      getFieldsTransformedValue,
    } = form

    return {
      form,
      submit,
      validate,
      matchPath,
      getFieldValue,
      setFieldValue,
      getFieldsValue,
      setFieldsValue,
      resetFieldValue,
      setInitialValue,
      resetFieldsValue,
      setInitialValues,
      restoreValidation,
      getFieldsTransformedValue,
    }
  },
})
</script>

<template>
  <n-flex vertical>
    <n-flex>
      <n-button
        type="primary"
        @click="() => {
          console.log(
            getFieldValue('username'),
            getFieldValue(['password']),
          )
        }"
      >
        获取单个字段的值
      </n-button>
      <n-button
        type="primary"
        @click="() => {
          console.log(getFieldsValue(['username', 'password']))
        }"
      >
        获取多个字段的值
      </n-button>
      <n-divider class="mt-4px! mb-4px!" />
      <n-button
        type="info"
        @click="() => {
          console.log(getFieldsValue())
        }"
      >
        获取表单值
      </n-button>
      <n-button
        type="info"
        @click="() => {
          console.log(getFieldsTransformedValue())
        }"
      >
        获取表单值(transform过的)
      </n-button>
      <n-button
        type="info"
        @click="() => {
          console.log(getFieldsValue(true))
        }"
      >
        获取所有值(被隐藏的和 setFieldsValue 设置的)
      </n-button>
      <n-divider class="mt-4px! mb-4px!" />
      <n-button
        type="error"
        @click="() => {
          setFieldValue('username', '123')
          setFieldValue('password', '123')
        }"
      >
        设置单个字段值
      </n-button>
      <n-button
        type="error"
        @click="() => {
          setFieldsValue({
            username: '345',
            password: '1',
            switch: true,
          })
        }"
      >
        设置多个字段值
      </n-button>
      <n-divider class="mt-4px! mb-4px!" />
      <n-button
        type="warning"
        @click="() => {
          resetFieldValue('username')
          resetFieldValue(['password'])
        }"
      >
        重置单个字段值
      </n-button>
      <n-button
        type="warning"
        @click="() => resetFieldsValue()"
      >
        重置所有字段值
      </n-button>
      <n-divider class="mt-4px! mb-4px!" />
      <n-button
        type="primary"
        @click="() => {
          setInitialValue('username', 'zcf')
          setInitialValue('password', '123')
        }"
      >
        设置单个字段初始值
      </n-button>
      <n-button
        type="primary"
        @click="() => {
          setInitialValues({
            switch: true,
            digit: 100,
          })
        }"
      >
        设置多个字段初始值
      </n-button>
      <n-divider class="mt-4px! mb-4px!" />
      <n-button
        type="info"
        @click="() => {
          validate('username')
          validate(['password'])
        }"
      >
        校验单个字段值
      </n-button>
      <n-button
        type="info"
        @click="() => {
          validate(['username', 'password'])
        }"
      >
        校验多个字段值
      </n-button>
      <n-button
        type="info"
        @click="() => {
          validate()
        }"
      >
        校验表单
      </n-button>
      <n-divider class="mt-4px! mb-4px!" />
      <n-button
        type="error"
        @click="() => {
          restoreValidation('username')
          restoreValidation(['password'])
        }"
      >
        清空单个字段校验
      </n-button>
      <n-button
        type="error"
        @click="() => {
          restoreValidation(['username', 'password'])
        }"
      >
        清空多个字段校验
      </n-button>
      <n-button
        type="error"
        @click="() => {
          restoreValidation()
        }"
      >
        清空表单校验
      </n-button>
      <n-divider class="mt-4px! mb-4px!" />
      <n-button
        type="warning"
        @click="() => {
          console.log(
            matchPath('username'),
            matchPath(/.*/),
            matchPath((path, _) => path === 'password'),
          )
        }"
      >
        匹配字段
      </n-button>
      <n-button type="warning" @click="submit">
        提交表单
      </n-button>
      <n-divider class="mt-4px! mb-4px!" />
    </n-flex>
    <pro-form
      :form="form"
      label-width="auto"
      label-placement="left"
    >
      <pro-input title="用户名" path="username" required />
      <pro-password title="密码" path="password" required />
      <pro-digit title="数字" path="digit" required />
      <pro-select
        title="下拉"
        path="select"
        required
        :field-props="{
          options: [
            {
              label: 'Everybody\'s Got Something to Hide Except Me and My Monkey',
              value: 'song0',
              disabled: true,
            },
            {
              label: 'Drive My Car',
              value: 'song1',
            },
            {
              label: 'Norwegian Wood',
              value: 'song2',
            },
          ],
        }"
      />
      <pro-switch title="开关" path="switch" required />
      <n-button type="primary" attr-type="submit">
        提交
      </n-button>
    </pro-form>
  </n-flex>
</template>
