<script setup lang="ts">
import { NButton, NFlex, NSelect } from 'naive-ui'
import {
  ProConfigProvider,
  ProDate,
  ProDateMonth,
  ProDateMonthRange,
  ProDateQuarter,
  ProDateQuarterRange,
  ProDateRange,
  ProDateYear,
  ProDateYearRange,
  ProForm,
  ProInput,
  ProTime,
  useProForm,
} from 'pro-components-naive-ui'
import { ref } from 'vue'

const [registerFormRef, { validate }] = useProForm()
const value = ref(null)
const options = [
  {
    label: 'Drive My Car',
    value: 'song1',
  },
  {
    label: 'Norwegian Wood',
    value: 'song2',
  },
]
</script>

<template>
  <ProConfigProvider>
    <NFlex>
      <NButton @click="validate()">
        校验
      </NButton>
    </NFlex>
    {{ JSON.stringify(value) }}
    <ProForm ref="registerFormRef">
      <ProInput label="输入" path="input" required readonly>
        <template #readonly-empty>
          --empty--
        </template>
      </ProInput>
      <n-checkbox-group v-model:value="value">
        <n-space item-style="display: flex;">
          <n-checkbox value="Beijing" label="北京" />
          <n-checkbox value="Shanghai" label="上海" />
          <n-checkbox value="Guangzhou" label="广州" />
          <n-checkbox value="Shenzen" label="深圳" />
        </n-space>
      </n-checkbox-group>
      <ProDate label="日期" path="date" required />
      <ProDate label="日期时间" path="date-time" required :field-props="{ showTime: true }" />
      <ProDateYear label="年" path="year" required />
      <ProDateMonth label="月" path="month" required />
      <ProDateQuarter label="季度" path="quarter" required />
      <ProTime label="时间" path="time" required />
      <ProDateRange label="日期范围" path="date-range" required />
      <ProDateRange label="日期范围时间" path="date-range-time" required :field-props="{ showTime: true }" />
      <ProDateYearRange label="年范围" path="year-range" required />
      <ProDateMonthRange label="月范围" path="month-range" required />
      <ProDateQuarterRange label="季度范围" path="quarter-range" required />
    </ProForm>
    <!-- <n-date-picker v-model:value="timestamp" type="date" /> -->
    <!-- <ProForm ref="registerFormRef">
      <div><ProInput label="用户1" path="u1" /></div>
      <div><ProInput label="用户2" path="u2" /></div>
      <div><ProInput label="用户3" path="u3" /></div>
    </ProForm> -->
    <!-- <ProForm>
      <ProFormList
        ref="registerRef"
        path="list"
        :initial-value="[
          { u1: '', u2: '', u3: '3' },
        ]"
      >
        <template #default="{ index }">
          <NFlex>
            <ProInput label="用户1" path="u1" />
            <ProInput
              label="用户2"
              path="u2"
              required
            />
            <ProInput label="用户3" path="u3" />
          </NFlex>
        </template>
      </ProFormList>
    </ProForm> -->
  </ProConfigProvider>
</template>

<style scoped></style>
