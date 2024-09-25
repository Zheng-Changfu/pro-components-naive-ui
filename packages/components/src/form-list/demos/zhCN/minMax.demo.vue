<markdown>
# 增删限制
</markdown>

<template>
  <pro-form>
    <pro-form-list
      title="用户信息"
      path="userInfo"
      :min="1"
      :max="3"
      only-show-first-item-label
    >
      <pro-input
        title="姓名"
        path="name"
      />
      <pro-digit
        title="年龄"
        path="age"
      />
    </pro-form-list>
  </pro-form>
</template>
