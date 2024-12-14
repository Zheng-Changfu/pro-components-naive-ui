# 快速上手
<!--single-column-->

`useRequest` 通过插件式组织代码，核心代码极其简单，并且可以很方便的扩展出更高级的功能。目前已有能力包括：

- 自动请求/手动请求
- 轮询
- 防抖
- 节流
- 屏幕聚焦重新请求
- 错误重试
- loading delay

接下来让我们先从两个最简单的例子认识 `useRequest`。

<n-alert type="info" title="说明" :bordered="false">
  useRequest 是抄的 <n-a href="https://ahooks.js.org/zh-CN/hooks/use-request/index">React ahooks useRequest@3.8.2(latest)</n-a>,只不过它是 Vue 版本的实现
</n-alert>

## 演示

```demo
default.vue
manual.vue
```

上面两个例子，我们演示了 useRequest 最基础的用法，接下来的我们开始逐个详细介绍 useRequest 的特性。
