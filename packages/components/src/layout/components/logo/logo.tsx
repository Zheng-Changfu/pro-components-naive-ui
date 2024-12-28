import type { SlotsType } from 'vue'
import type { ProLogoSlots } from './slots'
import { defineComponent } from 'vue'
import { proLogoProps } from './props'

export default defineComponent({
  name: 'ProLogo',
  props: proLogoProps,
  slots: Object as SlotsType<ProLogoSlots>,
  render() {

  },
})
