<markdown>
  # 禁用与只读
</markdown>

<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { useProFormInstance } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const disabled = ref(false)
    const readonly = ref(false)
    const [instRef, { submit }] = useProFormInstance()

    function onSubmit(values: any) {
      console.log(values, 'values')
    }

    return {
      disabled,
      readonly,
      instRef,
      submit,
      onSubmit,
    }
  },
})
</script>

<template>
  <n-flex vertical>
    <n-flex>
      <div>只读：<n-switch v-model:value="readonly" /></div>
      <div>禁用：<n-switch v-model:value="disabled" /></div>
    </n-flex>
    <pro-form
      ref="instRef"
      :readonly="readonly"
      :disabled="disabled"
      label-width="auto"
      label-placement="left"
      @submit="onSubmit"
    >
      <pro-input label="用户名" path="username" required />
      <pro-password label="密码" path="password" required />
      <pro-digit label="数字" path="digit" required />
      <pro-date label="日期" path="date" required />
      <pro-date label="日期-时间" path="date-time" required :field-props="{ type: 'datetime' }" />
      <pro-time label="时间" path="time" required />
      <pro-slider label="滑动选择" path="slider" required />
      <pro-select
        label="下拉"
        path="select"
        required
        :field-props="{
          multiple: true,
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
      <pro-switch label="开关" path="switch" required />
      <pro-upload label="上传" path="upload" required />
      <pro-transfer
        label="穿梭框"
        path="transfer"
        required
        :field-props="{
          sourceFilterable: true,
          targetFilterable: true,
          options: Array.from({ length: 100 }).map((_, i) => ({
            label: `Option ${i}`,
            value: i,
            disabled: i % 5 === 0,
          })),
        }"
      />
      <pro-textarea label="文本域" path="textarea" required />
      <pro-checkbox label="复选框" path="checkbox" required />
      <pro-date-year label="日期-年" path="date-year" required />
      <pro-date-week label="日期-周" path="date-week" required />
      <pro-date-range label="日期范围" path="date-range" required />
      <pro-date-range label="日期时间范围" path="date-time-range" required :field-props="{ type: 'datetime' }" />
      <pro-date-month label="日期-月" path="date-month" required />
      <pro-radio-group
        label="单选组"
        path="radio-group"
        required
        :field-props="{
          options: [
            {
              value: 'Shakermaker',
              label: 'Shakermaker',
            },
            {
              value: 'Up in the Sky',
              label: 'Up in the Sky',
            },
            {
              value: '...',
              label: '...',
            },
          ],
        }"
      />
      <pro-tree-select
        label="树形选择"
        path="tree-select"
        required
        :field-props="{
          multiple: true,
          options: [
            {
              label: 'Rubber Soul',
              key: 'Rubber Soul',
              children: [
                {
                  label: 'Drive My Car',
                  key: 'Drive My Car',
                  disabled: true,
                },
                {
                  label: 'Norwegian Wood',
                  key: 'Norwegian Wood',
                },
                {
                  label: 'Nowhere Man',
                  key: 'Nowhere Man',
                },
                {
                  label: 'Think For Yourself',
                  key: 'Think For Yourself',
                },
                {
                  label: 'The Word',
                  key: 'The Word',
                },
                {
                  label: 'Michelle',
                  key: 'Michelle',
                  disabled: true,
                },
                {
                  label: 'What goes on',
                  key: 'What goes on',
                },
                {
                  label: 'Girl',
                  key: 'Girl',
                },
                {
                  label: 'In My Life',
                  key: 'In My Life',
                },
                {
                  label: 'Wait',
                  key: 'Wait',
                },
              ],
            },
            {
              label: 'Let It Be',
              key: 'Let It Be Album',
              children: [
                {
                  label: 'Two Of Us',
                  key: 'Two Of Us',
                },
                {
                  label: 'Dig A Pony',
                  key: 'Dig A Pony',
                },
                {
                  label: 'Across The Universe',
                  key: 'Across The Universe',
                },
                {
                  label: 'I Me Mine',
                  key: 'I Me Mine',
                },
                {
                  label: 'Dig It',
                  key: 'Dig It',
                },
                {
                  label: 'Let It Be',
                  key: 'Let It Be',
                },
                {
                  label: 'Maggie Mae',
                  key: 'Maggie Mae',
                },
                {
                  label: 'One After 909',
                  key: 'One After 909',
                },
                {
                  label: 'The Long And Winding Road',
                  key: 'The Long And Winding Road',
                },
                {
                  label: 'For You Blue',
                  key: 'For You Blue',
                },
                {
                  label: 'Get Back',
                  key: 'Get Back',
                },
              ],
            },
          ],
        }"
      />
      <pro-date-quarter label="日期-季度" path="date-quarter" required />
      <pro-checkbox-group
        label="复选框组"
        path="checkbox-group"
        required
        :field-props="{
          options: [
            { label: '北京', value: 0 },
            { label: '上海', value: 1 },
            { label: '深圳', value: 2 },
            { label: '长沙', value: 3 },
          ],
        }"
      />
      <pro-date-year-range label="日期-年范围" path="date-year-range" required />
      <pro-date-month-range label="日期-月范围" path="date-month-range" required />
      <pro-date-quarter-range label="日期-季度范围" path="date-quarter-range" required />
      <n-button type="primary" @click="submit">
        登录
      </n-button>
    </pro-form>
  </n-flex>
</template>
