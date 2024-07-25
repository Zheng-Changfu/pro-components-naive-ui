import { computed, unref } from 'vue'
import { isFunction, isUndefined } from 'lodash-es'
import { useInjectGlobalConfig } from '../config-provider'
import type { ProButtonProps } from './props'

export function useAuth(props: ProButtonProps) {
  const { proButton } = useInjectGlobalConfig()

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
      return hasAuth(auth, unref(authData))
    }
    return false
  })

  return {
    pass,
  }
}
