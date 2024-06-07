<script setup lang="ts">
import { ProForm, ProInput } from 'pro-components-naive-ui'
</script>

<template>
  <div>
    <ProForm>
      <ProInput label="用户名1" path="name1" />
      <ProInput label="用户名2" path="name2" required="{{ $vals.name1 === '1' }}" hidden="{{ $vals.name1 === '123' }}" />
      <ProInput label="用户名3" path="name3" />
    </ProForm>
  </div>
</template>

<style scoped></style>
