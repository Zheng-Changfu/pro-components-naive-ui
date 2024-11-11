<markdown>
# 自定义展开收起

提示：如果你只是想修改文字，你可以通过语言包完成功能
</markdown>

<template>
  <pro-card title="卡片">
    卡片内容
    <template #collapse="{ expanded }">
      <div v-if="expanded" class="color-red">
        折叠
      </div>
      <div v-else class="color-blue">
        打开
      </div>
    </template>
  </pro-card>
</template>
