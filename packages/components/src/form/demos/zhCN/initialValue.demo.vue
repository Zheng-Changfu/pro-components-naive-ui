<markdown>
# 初始值的几种方式
以下几种方式，优先级由高到低
1. 使用组件的 `value` 属性
2. 使用组件的 `initialValue` 属性
3. 使用 `ProForm` 的 `initialValues` 属性
</markdown>

<template>
  <pro-form
    label-placement="left"
    label-width="auto"
    :initial-values="{
      username: 'zcf',
    }"
    @submit="console.log"
  >
    <pro-input
      title="用户名"
      path="username"
      required
    />
    <pro-input
      title="邮箱"
      path="email"
      required
      value="zcf"
    />
    <pro-password
      title="密码"
      path="password"
      required
      initial-value="zcf"
    />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
