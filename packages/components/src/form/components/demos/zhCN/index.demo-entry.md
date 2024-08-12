# 表单项 ProField
<!--single-column-->

一个表单除了 `Form` 之外还是需要一系列的表单项，`ProForm` 自带了数量可观的表单项，这些组件本质上是 `NFormItem` 和组件的结合，我们可以把他们当成一个 `NFormItem` 来使用，并且支持各种 `props`。每个表单项都支持 `fieldProps` 属性来支持设置输入组件的 `props`。 我们支持了 `placeholder` 的透传，你可以直接在组件上设置 `placeholder`。
每个表单项同时也支持了 `readonly` ，不同的组件会有不同的只读样式，与 disable 相比 readonly 展示更加友好。生成的 dom 也更小（PS：这段说明是抄的 [ProComponents](https://procomponents.ant.design/components/field-set#proformtext-demo-components-other)，因为懒得写一大段字）

ProInput 是 NFormItem + Input 的产物，可以简单理解成以下的代码
```html
<!-- ProInput -->
<template>
  <n-form-item v-bind="$props">
    <n-input :placeholder="props.placeholder" v-bind="$props.fieldProps" />
  </n-form-item>
</template>
```
所以我们给 ProInput 设置的 props 其实是 NFormItem 的，fieldProps 才是包含的组件的，要切记。

## 演示

```demo
item.vue
date.vue
```
