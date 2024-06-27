import { create } from './create'
import * as components from './components'

const proComponents = create({
  components: Object.keys(components).map(
    key => components[key as keyof typeof components],
  ),
})

export default proComponents
export const install = proComponents.install
