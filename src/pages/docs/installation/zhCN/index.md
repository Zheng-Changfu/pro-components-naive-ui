<!--anchor:on-->

# 安装

> 注意，pro-naive-ui 依赖 naive-ui。

<n-tabs type="line" animated>
  <n-tab-pane name="npm" tab="npm">
    <n-card embedded>
      <n-code>npm i pro-naive-ui</n-code>
    </n-card>
  </n-tab-pane>
  <n-tab-pane name="pnpm" tab="pnpm">
    <n-card embedded>
      <n-code>pnpm i pro-naive-ui</n-code>
    </n-card>
  </n-tab-pane>
  <n-tab-pane name="yarn" tab="yarn">
    <n-card embedded>
      <n-code>yarn add pro-naive-ui</n-code>
    </n-card>
  </n-tab-pane>
</n-tabs>


## UMD

如果你要使用 minify 版本的包，将 `https://unpkg.com/pro-naive-ui@version/dist/index.prod.js` 作为 `src`，`version` 是你期望使用的版本，如果不指定 `version` 则会使用最新的版本。

你最好锁定包的版本，不然可能会有不兼容变更。

下面是个基本 demo

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script src="https://unpkg.com/vue"></script>
    <!-- 会使用最新版本，你最好指定一个版本 -->
    <script src="https://unpkg.com/naive-ui"></script>
    <!-- 会使用最新版本，你最好指定一个版本 -->
    <script src="https://unpkg.com/pro-naive-ui"></script>
  </head>
  <body>
    <div id="app">
      <pro-card title="title">
        {{ message }}
      </pro-card>
    </div>
    <script>
      const App = {
        setup() {
          return {
            message: 'pro-naive'
          }
        }
      }
      const app = Vue.createApp(App)
      app.use(proNaive)
      app.mount('#app')
    </script>
  </body>
</html>
```

## 在 SFC 中使用

如果你想使用单文件组件风格（SFC - Single File Component），可以选择直接引入或全局安装在 Vue App 中。

### 直接引入（推荐）

你可以直接导入组件并使用它。这种情况下，只有导入的组件才会被打包。

如果你想知道如何按需引入主题和语言包，请参考 <n-a href="#按需引入（Tree-Shaking）">按需引入</n-a>。

```html
<template>
  <pro-card>pro-naive-ui</pro-card>
</template>

<script>
  import { defineComponent } from 'vue'
  import { ProCard } from 'pro-naive-ui'

  export default defineComponent({
    components: {
      ProCard
    }
  })
</script>
```

如果你可以使用 setup script，你可以用下面的方式使用组件。

```html
<template>
  <pro-card>pro-naive-ui</pro-card>
</template>

<script setup>
  import { ProCard } from 'pro-naive-ui'
</script>
```

### 全局安装（不推荐）

失去 tree-shaking 的能力，打包有冗余代码。

如果你想全局安装但是不想安装全部组件，请参考 <n-a href="#按需引入（Tree-Shaking）">按需引入</n-a>。

```js
import proNaive from 'pro-naive-ui'
import { createApp } from 'vue'

const app = createApp(App)
app.use(proNaive)
```

安装后，你可以这样在 SFC 中使用全部组件。

```html
<template>
  <pro-card>pro-naive-ui</pro-card>
</template>
```

## 按需引入（Tree Shaking）

Pro Naive UI 支持 tree shaking，组件、语言均可 tree-shaking。

默认情况语言为英文，无需额外导入。

### 手动引入

```html
<script>
  import { defineComponent } from 'vue'
  import { ProConfigProvider, ProCard } from 'pro-naive-ui'
  // locale
  import { zhCN } from 'pro-naive-ui'

  export default defineComponent({
    components: {
      ProConfigProvider,
      ProCard,
    },
    setup() {
      return {
        zhCN,
      }
    }
  })
</script>

<template>
  <pro-config-provider :locale="zhCN">
    <pro-card>pro-naive-ui</pro-card>
  </pro-config-provider>
</template>

<style>
  body {
    background: black;
  }
</style>
```

### 自动引入

可以使用 `unplugin-vue-components` 插件和 `pro-naive-ui-resolver` 来自动导入组件。

```ts
import vue from '@vitejs/plugin-vue'
import { ProNaiveUIResolver } from 'pro-naive-ui-resolver'
import Components from 'unplugin-vue-components/vite'
// vite.config.ts
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [ProNaiveUIResolver()]
    })
  ]
})
```

### 按需全局安装组件（手动）

```js
import {
  create,
  ProCard,
} from 'pro-naive-ui'
import { createApp } from 'vue'

const proNaive = create({
  components: [ProCard]
})

const app = createApp()
app.use(proNaive)
```

安装后，你可以这样在 SFC 中使用你安装的组件。

```html
<template>
  <pro-card>pro-naive-ui</pro-card>
</template>
```
