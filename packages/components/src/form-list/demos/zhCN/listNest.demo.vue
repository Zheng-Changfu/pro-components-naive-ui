<markdown>
# 表单列表嵌套联动

内部会自动处理路径，可以很方便的实现嵌套及联动
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { NCard } from 'naive-ui'
import { useProFormInst } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [instRef, {
      submit,
      restoreFieldsValue,
    }] = useProFormInst()

    return {
      instRef,
      submit,
      restoreFieldsValue,
    }
  },
})
</script>

<template>
  <pro-form ref="instRef" @submit="console.log">
    <pro-input
      label="姓名"
      path="name"
      required
    />
    <pro-form-list
      label="用户信息"
      path="users"
      required
      :initial-value="[
        { name: 'zcf' },
      ]"
    >
      <template #item="{ index, itemVNode, actionVNode }">
        <n-card
          embedded
          :title="`标题${index + 1}`"
          class="mb-8px"
        >
          <component :is="itemVNode" />
          <template #header-extra>
            <component :is="actionVNode" />
          </template>
        </n-card>
      </template>
      <n-flex>
        <pro-input
          label="姓名"
          name="name"
        />
        <pro-input
          label="昵称"
          name="nickName"
        />
      </n-flex>
      <pro-form-list
        label="用户信息"
        path="labels"
        required
        :copy-button-props="{
          tooltip: '复制',
        }"
        :remove-button-props="{
          tooltip: '不需要这行了',
        }"
      >
        <n-flex>
          <pro-input
            label="值"
            path="value"
          />
          <pro-input
            label="显示名称"
            path="label"
          />
        </n-flex>
      </pro-form-list>
    </pro-form-list>
    <n-flex>
      <n-button type="primary" @click="restoreFieldsValue">
        重置
      </n-button>
      <n-button type="primary" @click="submit">
        提交
      </n-button>
    </n-flex>
  </pro-form>
</template>
