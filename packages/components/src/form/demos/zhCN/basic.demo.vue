<markdown>
# 基本使用

如果按钮被 `pro-form` 组件包裹，使用 `attr-type` 为 `submit` 提交表单，使用 `attr-type` 为 `reset` 重置表单
</markdown>

<template>
  <pro-form label-placement="left" label-width="auto" @submit="console.log">
    <pro-input tooltip="用户名" title="用户名" path="username" required />
    <pro-password :tooltip="['1', '2']" title="密码" path="password" required />
    <n-button attr-type="reset">
      重置
    </n-button>
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
