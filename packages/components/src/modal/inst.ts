import type { EventHookOn } from '@vueuse/core'

type NextTickCallback = () => void

export interface ProModalInst {
  /**
   * 打开弹窗，如果传递了回调，该回调会在下一轮更新中被调用，内部使用了 nextTick 包裹
   */
  open: (callback?: NextTickCallback) => void
  /**
   * 关闭弹窗，如果传递了回调，该回调会在下一轮更新中被调用，内部使用了 nextTick 包裹
   */
  close: (callback?: NextTickCallback) => void
  /**
   * 打开弹窗之后被调用
   */
  onAfterEnter: EventHookOn
  /**
   * 关闭弹窗之后被调用
   */
  onAfterLeave: EventHookOn
  /**
   * 退出全屏
   */
  exitFullscreen: () => Promise<void>
  /**
   * 进入全屏
   */
  enterFullscreen: () => Promise<void>
  /**
   * 切换全屏
   */
  toggleFullscreen: () => Promise<void>
}
