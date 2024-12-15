# useRequest
<!--single-column-->

`useRequest` 通过插件式组织代码,核心代码极其简单,并且可以很方便的扩展出更高级的功能。目前已有能力包括：

- 自动请求/手动请求
- 轮询
- 防抖
- 节流
- 屏幕聚焦重新请求
- 错误重试
- loading delay
- 竞态取消

<n-alert type="info" title="说明" :bordered="false">
  useRequest 是抄的 <n-a href="https://ahooks.js.org/zh-CN/hooks/use-request/index">React ahooks useRequest@3.8.2(latest)</n-a>,只不过它是 Vue 版本的实现
</n-alert>

## 演示

```demo
default.vue
manual.vue
manual-run-and-run-async.vue
life-cycle.vue
refresh.vue
cancel.vue
params.vue
loading-delay.vue
polling.vue
polling-error.vue
refresh-deps.vue
refresh-deps-action.vue
refresh-on-window-focus.vue
debounce.vue
throttle.vue
retry.vue
```


## API

### useRequest Options

下面列举的参数是传递给 `useRequest` 的,引用到的类型声明介绍如下
```typescript
import type { Ref } from 'vue'
type MaybeRefOrGetter<T> = T | Ref<T> | (() => T)
```
下方类型为 `MaybeRefOrGetter` 的参数都支持动态变化

| 名称                   | 类型                                               | 默认值  | 说明                                                                                                                                                                                                | 版本 |
| ---------------------- | -------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| manual                 | `boolean`                                          | `false` | 默认 `false`。 即在初始化时自动执行 service。如果设置为 `true`,则需要手动调用 `run` 或 `runAsync` 触发执行。                                                                                        |      |
| onBefore               | `(params: Params) => void`                         | `-`     | service 执行前触发                                                                                                                                                                                  |      |
| onSuccess              | `(data: Data, params: Params) => void`             | `-`     | service `resolve` 时触发                                                                                                                                                                            |      |
| onError                | `(e: Error, params: Params) => void`               | `-`     | service `reject` 时触发                                                                                                                                                                             |      |
| onFinally              | `(params: Params, data?: Data, e?: Error) => void` | `-`     | service 执行完成时触发                                                                                                                                                                              |      |
| debounceWait           | `MaybeRefOrGetter<number>`                         | `-`     | 防抖等待时间, 单位为毫秒,设置后,进入防抖模式                                                                                                                                                        |      |
| debounceLeading        | `MaybeRefOrGetter<boolean>`                        | `false` | 在延迟开始前执行调用                                                                                                                                                                                |      |
| debounceTrailing       | `MaybeRefOrGetter<boolean>`                        | `true`  | 在延迟结束后执行调用                                                                                                                                                                                |      |
| debounceMaxWait        | `MaybeRefOrGetter<number>`                         | `-`     | 允许被延迟的最大值                                                                                                                                                                                  |      |
| throttleWait           | `MaybeRefOrGetter<number>`                         | `-`     | 节流等待时间, 单位为毫秒,设置后,进入节流模式                                                                                                                                                        |      |
| throttleLeading        | `MaybeRefOrGetter<boolean>`                        | `true`  | 在节流开始前执行调用                                                                                                                                                                                |      |
| throttleTrailing       | `MaybeRefOrGetter<boolean>`                        | `true`  | 在节流结束后执行调用                                                                                                                                                                                |      |
| retryCount             | `MaybeRefOrGetter<number>`                         | `-`     | 错误重试次数。如果设置为 `-1`,则无限次重试。`cancel` 可以取消正在进行的重试行为                                                                                                                     |      |
| retryInterval          | `MaybeRefOrGetter<number>`                         | `-`     | 重试时间间隔,单位为毫秒。如果不设置,默认采用简易的指数退避算法,取 `1000 * 2 ** retryCount`,也就是第一次重试等待 2s,第二次重试等待 4s,以此类推,如果大于 30s,则取 30s                                 |      |
| refreshOnWindowFocus   | `MaybeRefOrGetter<boolean>`                        | `false` | 在屏幕重新获取焦点或重新显示时,重新发起请求。监听的浏览器事件为 `visibilitychange` 和 `focus`                                                                                                       |      |
| focusTimespan          | `MaybeRefOrGetter<number>`                         | `5000`  | 重新请求间隔,单位为毫秒                                                                                                                                                                             |      |
| refreshDeps            | `同 watch`                                         | `-`     | 依赖数组。当数组内容变化后会刷新（重复上一次请求）。同 `watch` 的第一个参数。如果设置 `options.manual = true`,则 `refreshDeps`, `refreshDepsAction` 都不再生效,需要通过 `run/runAsync` 手动触发请求 |      |
| refreshDepsAction      | `() => void`                                       | `-`     | 自定义依赖数组变化时的请求行为。如果设置 `options.manual = true`,则 `refreshDeps`, `refreshDepsAction` 都不再生效,需要通过 `run/runAsync` 手动触发请求                                              |      |
| pollingInterval        | `MaybeRefOrGetter<number>`                         | `0`     | 轮询间隔,单位为毫秒。如果值大于 0,则处于轮询模式。                                                                                                                                                  |      |
| pollingWhenHidden      | `MaybeRefOrGetter<boolean>`                        | `true`  | 在页面隐藏时,是否继续轮询。如果设置为 `false`,在页面隐藏时会暂时停止轮询,页面重新显示时继续上次轮询。                                                                                               |      |
| pollingErrorRetryCount | `MaybeRefOrGetter<number>`                         | `-1`    | 轮询错误重试次数。如果设置为 `-1`,则无限次                                                                                                                                                          |      |
| loadingDelay           | `MaybeRefOrGetter<number>`                         | `0`     | 设置 `loading` 变成 `true` 的延迟时间                                                                                                                                                               |      |

### useRequest Returned

下面列举的参数是调用 `useRequest` 函数返回的,引用到的类型声明介绍如下
```typescript
import type { Ref } from 'vue'
```

| 名称         | 类型                                   | 默认值           | 说明                                                                                        | 版本 |
| ------------ | -------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------- | ---- |
| data         | `Ref<Data \| undefined>`               | `Ref<undefined>` | service 返回的数据                                                                          |      |
| error        | `Ref<Error \| undefined>`              | `Ref<undefined>` | service 抛出的异常                                                                          |      |
| loading      | `Ref<boolean>`                         | `Ref<false>`     | service 是否正在执行                                                                        |      |
| params       | `Ref<Params>`                          | `Ref<[]>`        | 当次执行的 service 的参数数组。比如你触发了 `run(1, 2, 3)`,则 params.value 等于 `[1, 2, 3]` |      |
| run          | `(...params: Params) => void`          | `-`              | 手动触发 service 执行,参数会传递给 service。异常自动处理,通过 `onError` 反馈                |      |
| runAsync     | `(...params: Params) => Promise<Data>` | `-`              | 与 `run` 用法一致,但返回的是 Promise,需要自行处理异常。                                     |      |
| refresh      | `() => void`                           | `-`              | 使用上一次的 params,重新调用 `run`                                                          |      |
| refreshAsync | `() => Promise<Data>`                  | `-`              | 使用上一次的 params,重新调用 `runAsync`                                                     |      |
| cancel       | `() => void`                           | `-`              | 忽略当前 Promise 的响应                                                                     |      |
