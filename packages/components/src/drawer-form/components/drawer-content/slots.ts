import type { FooterRender } from './props'

export interface ProDrawerContentSlots {
  default: any
  header: any
  /**
   * 自定义 footer
   */
  footer: Parameters<FooterRender>['0']
}
