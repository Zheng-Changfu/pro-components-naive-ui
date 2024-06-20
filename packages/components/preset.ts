import { create } from './create'
import * as components from './components'

const pro = create({
  components: Object.keys(components)
    .filter((key) => {
      const comp: any = components[key as keyof typeof components]
      return comp.name && comp.setup
    })
    .map(
      key => components[key as keyof typeof components],
    ),
})

export default pro
