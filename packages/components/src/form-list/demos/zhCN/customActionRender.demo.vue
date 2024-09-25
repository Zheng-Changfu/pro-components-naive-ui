<markdown>
# 自定义渲染操作按钮

使用 `action-render` 自定义渲染按钮和布局
</markdown>

<script lang="tsx">
import { ArrowDownOutlined, ArrowUpOutlined } from '@vicons/antd'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    ArrowUpOutlined,
    ArrowDownOutlined,
  },
})
</script>

<template>
  <pro-form>
    <pro-form-list
      title="用户信息"
      path="userInfo"
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
      <template #action="{ index, action, actionVNode }">
        <n-flex class="h-34px leading-34px mb-24px">
          <n-button text @click="action.moveUp(index)">
            <template #icon>
              <n-icon>
                <ArrowUpOutlined />
              </n-icon>
            </template>
          </n-button>
          <n-button text @click="action.moveDown(index)">
            <template #icon>
              <n-icon>
                <ArrowDownOutlined />
              </n-icon>
            </template>
          </n-button>
          <component :is="actionVNode" />
        </n-flex>
      </template>
    </pro-form-list>
  </pro-form>
</template>
