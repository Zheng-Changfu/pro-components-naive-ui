<!--anchor:on-->

# 国际化

Pro Naive UI 通过使用 `pro-config-provider` 调整语言，默认情况下所有组件均为英语。

了解更多关于 `pro-config-provider` 的信息，参见 [全局化配置](../components/config-provider)。

## 配置

将 `pro-config-provider` 的 `locale` 设为从 pro-naive-ui 导入的 `zhCN` 来设定全局中文。

```html
<template>
  <pro-config-provider :locale="zhCN">
    <app />
  </pro-config-provider>
</template>

<script>
  import { defineComponent } from 'vue'
  import { ProConfigProvider,zhCN } from 'pro-naive-ui'

  export default defineComponent({
    components: {
      ProConfigProvider
    },
    setup() {
      return {
        zhCN,
      }
    }
  })
</script>
```

## 在现有国际化基础上调整

参考 [在现有国际化基础上调整](../components/config-provider#edit-i18n.vue)
