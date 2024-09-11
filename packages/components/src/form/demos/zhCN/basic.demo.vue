<markdown>
# 基本使用

按钮在 `form` 内部使用 `attr-type: 'submit'` 提交，否则使用 `submit` 方法提交
</markdown>

<template>
  <pro-form label-placement="left" label-width="auto" @submit="console.log">
    <pro-input tooltip="用户名" title="用户名" path="username" required />
    <pro-password :tooltip="['1', '2']" title="密码" path="password" required />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
