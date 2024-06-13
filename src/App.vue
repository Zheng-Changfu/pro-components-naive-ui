<script setup lang="ts">
import { NGrid, NGridItem } from 'naive-ui'
import { ProConfigProvider, ProForm, ProInput } from 'pro-components-naive-ui'
</script>

<template>
  <ProConfigProvider>
    <ProForm readonly="{{ $vals.name1==='123' }}">
      <NGrid x-gap="12" :cols="3">
        <NGridItem>
          <ProInput required label="用户名1" path="name1" />
        </NGridItem>
        <NGridItem>
          <ProInput
            label="用户名2"
            path="name2"
            required="{{ $vals.name1 === '1' }}"
          />
        </NGridItem>
        <NGridItem>
          <ProInput label="用户名1" path="name3">
            <template #empty>
              empty---
            </template>
            <template #readonly="{ value }">
              {{ value }}
            </template>
          </ProInput>
        </NGridItem>
      </NGrid>
    </ProForm>
  </ProConfigProvider>
</template>

<style scoped></style>
