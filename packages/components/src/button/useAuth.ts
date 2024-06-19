import { computed } from 'vue'
import { isFunction, isUndefined } from 'lodash-es'
import { useInjectGlobalConfigContext } from '../config-provider'
import type { ProButtonProps } from './props'

export function useAuth<T extends ProButtonProps>(props: T) {
  const { proButton } = useInjectGlobalConfigContext()

  const {
    hasAuth,
    authData,
  } = proButton

  const pass = computed(() => {
    const { auth } = props
    if (isUndefined(auth)) {
      return true
    }
    if (isFunction(hasAuth)) {
      return hasAuth(auth, authData)
    }
    return false
  })

  return {
    pass,
  }
}
