import type { FooterRender } from './props'

export interface DrawerFormSlots {
  /**
   * 自定义 footer
   */
  footer?: Parameters<FooterRender>['0']
}
