import { ref } from 'vue'
import type { ProFormInstance } from './inst'

export function useProForm() {
  const proFormInst = ref<ProFormInstance>()

  const methods = new Proxy<ProFormInstance>(proFormInst as any, {
    get(_, key, receiver) {
      const inst = proFormInst.value
      if (!inst) {
        // eslint-disable-next-line node/prefer-global/process
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[ProForm]: instance does not exist!')
        }
        return
      }
      return Reflect.get(inst, key, receiver)
    },
  })

  return [proFormInst, methods]
}
