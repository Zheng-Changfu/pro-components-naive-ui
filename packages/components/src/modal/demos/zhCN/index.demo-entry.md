# 弹窗 ProModal
基于 [NModal](https://www.naiveui.com/zh-CN/os-theme/components/modal) 封装，增加了拖拽和全屏以及一些方法

## 演示

```demo
draggable.vue
fullscreen.vue
notVModelShow.vue
open-form.vue
```

## API
### ProModal 属性
| 名称 | 类型 | 默认值 | 说明 | 版本 |
| --- | --- | --- | --- | --- |
| draggable | `boolean \| { sticky: boolean }` | true | 弹窗是否可拖拽，无预设时不生效，`sticky` 控制是否可以拖出可视区域外 | |
| fullscreen | `boolean` | true | 弹窗是否可全屏，只在 `preset` 为 `card` 时生效，有需要时可通过实例方法实现 | |
| [...NModalProps](https://www.naiveui.com/zh-CN/os-theme/components/modal#Modal-Props) |  | |  |  |

### ProModal 实例方法
使用 `useProModalInst` 可以拿到组件方法

| 名称 | 类型 | 说明 | 版本 |
| --- | --- | --- | --- |
| open | `(callback?: Function) => void` | 打开弹窗，如果传递了回调，该回调会在下一轮更新中被调用，内部使用了 nextTick 包裹 |  |
| close | `(callback?: Function) => void` | 关闭弹窗，如果传递了回调，该回调会在下一轮更新中被调用，内部使用了 nextTick 包裹 |  |
| onAfterEnter | `(fn: () => void) => void` | 打开弹窗之后被调用 |  |
| onAfterLeave | `(fn: () => void) => void` | 关闭弹窗之后被调用 |  |
| exitFullscreen | `() => Promise<void>` | 退出全屏 |  |
| enterFullscreen | `() => Promise<void>` | 进入全屏 |  |
| toggleFullscreen | `() => Promise<void>` | 切换全屏 |  |
