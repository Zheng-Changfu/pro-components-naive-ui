<script setup lang="ts">
import { NButton, NFlex } from 'naive-ui'
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

const [registerFormRef, { validate }] = useProForm()
</script>

<template>
  <ProConfigProvider>
    <NFlex>
      <NButton @click="validate()">
        校验
      </NButton>
    </NFlex>
    <ProForm ref="registerFormRef">
      <ProInput label="输入" path="input" required />
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
