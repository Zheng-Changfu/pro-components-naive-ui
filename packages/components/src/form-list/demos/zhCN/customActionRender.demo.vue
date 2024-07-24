<markdown>
# 自定义渲染操作按钮

使用 `action-render` 自定义渲染按钮和布局
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { NButton, NFlex, NIcon } from 'naive-ui'
import { ArrowDownOutlined, ArrowUpOutlined } from '@vicons/antd'
import type { ProFormListActionRender } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    function actionRender(opt: Parameters<ProFormListActionRender>['0']) {
      const {
        total,
        index,
        action,
        actionVNode,
      } = opt
      console.log(total, index, action)
      return (
        <NFlex class="h-34px leading-34px mb-24px">
          <NButton
            text
            renderIcon={() => {
              return (
                <NIcon>
                  <ArrowUpOutlined />
                </NIcon>
              )
            }}
            onClick={() => {
              action.moveUp(index)
            }}
          />
          <NButton
            text
            renderIcon={() => {
              return (
                <NIcon>
                  <ArrowDownOutlined />
                </NIcon>
              )
            }}
            onClick={() => {
              action.moveDown(index)
            }}
          />
          {actionVNode}
        </NFlex>
      )
    }

    return {
      actionRender,
    }
  },
})
</script>

<template>
  <pro-form>
    <pro-form-list
      label="用户信息"
      path="userInfo"
      only-show-first-item-label
      :action-render="actionRender"
    >
      <pro-input
        label="姓名"
        path="name"
      />
      <pro-digit
        label="年龄"
        path="age"
      />
    </pro-form-list>
  </pro-form>
</template>
