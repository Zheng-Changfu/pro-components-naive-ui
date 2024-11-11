<markdown>
# 自身联动
</markdown>

<template>
  <pro-form label-placement="left" label-width="auto">
    <pro-input
      title="颜色"
      path="color"
      :field-props="{
        style: {
          background: '{{ $self }}',
        },
      }"
    />
  </pro-form>
</template>
