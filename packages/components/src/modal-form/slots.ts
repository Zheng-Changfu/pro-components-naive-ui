import type { ProModalSlots } from '../modal/slots'
import type { FooterRender } from './props'

export interface ProModalFormSlots extends Omit<ProModalSlots, 'footer'> {
  /**
   * 自定义 footer
   */
  footer: Parameters<FooterRender>['0']
}
