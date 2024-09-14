<markdown>
# 自定义新增、复制、删除属性

如果传入的属性为 `false`，则不显示对应按钮
</markdown>

<script lang="tsx">
import { CloseCircleOutlined, PlusCircleTwotone, SmileOutlined } from '@vicons/antd'
import { NIcon } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    function renderCreatorIcon() {
      return (
        <NIcon>
          <PlusCircleTwotone />
        </NIcon>
      )
    }

    function renderCopyIcon() {
      return (
        <NIcon>
          <SmileOutlined />
        </NIcon>
      )
    }

    function renderRemoveIcon() {
      return (
        <NIcon>
          <CloseCircleOutlined />
        </NIcon>
      )
    }

    return {
      renderCopyIcon,
      renderRemoveIcon,
      renderCreatorIcon,
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
      :creator-button-props="{
        tooltip: '新增~~',
        renderIcon: renderCreatorIcon,
      }"
      :copy-button-props="{
        tooltip: '你是牛马么？',
        renderIcon: renderCopyIcon,
      }"
      :remove-button-props="{
        tooltip: 'No~',
        renderIcon: renderRemoveIcon,
      }"
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
