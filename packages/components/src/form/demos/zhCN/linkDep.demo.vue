<markdown>
# 依赖联动
</markdown>

<template>
  <pro-form label-placement="left" label-width="auto">
    <pro-digit title="控制者" path="dim_1" :initial-value="0" />
    <pro-digit title="控制者" path="dim_2" :initial-value="0" />
    <pro-digit title="受控者" path="result" readonly value="{{ $vals.dim_1 * $vals.dim_2 }}" />
  </pro-form>
</template>
