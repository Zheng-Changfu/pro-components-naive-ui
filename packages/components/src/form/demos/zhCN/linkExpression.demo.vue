<markdown>
# 联动-表达式

内置了一些基础的表达式变量，方便做一些联动，你也可以在全局配置表达式
1. `$self`：当前字段值
2. `$values`:`$vals`：整个表单的值，包含了已经被隐藏的字段
3. `$total`：当前所在列表的长度，只会在 `ProFormList` 中生效，其他返回的是 0
4. `$row`:`$record`：当前行的值，只会在 `ProFormList` 中生效，其他返回的是空对象
5. `$rowIndex`:`$index`：当前字段在列表中的索引，只会在 `ProFormList` 中生效，其他返回的是 -1
</markdown>

<template>
  <pro-form label-placement="left" label-width="auto" @submit="console.log">
    <pro-input
      title="颜色"
      path="color"
      required
      initial-value="#ccc"
      :field-props="{
        style: {
          background: '{{ $self }}',
        },
      }"
    />
    <pro-digit
      title="#ccc显示"
      path="color#ccc"
      required
      visible="{{ $vals.color === '#ccc' }}"
    />
    <pro-digit
      title="#eee隐藏"
      path="color#eee"
      required
      hidden="{{ $vals.color === '#eee' }}"
    />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
