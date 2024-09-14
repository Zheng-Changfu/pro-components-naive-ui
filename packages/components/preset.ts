import * as components from './components'
import { create } from './create'

const proComponents = create({
  components: Object.keys(components).map(
    key => components[key as keyof typeof components],
  ),
})

export default proComponents
export const install = proComponents.install
