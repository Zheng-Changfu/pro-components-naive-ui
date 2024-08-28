import { isFunction } from 'lodash-es'
import type { DescriptionsProps } from 'naive-ui'
import type { AnyFn } from '../../types'
import type { ProDescriptionsProps } from '../props'
import type { ProDescriptionColumns } from '../types'
import { useProDescriptionsInst } from '../inst'
import type { UseFetchDataBaseOptions, UseFetchDataOptionsPassedTransform } from './useFetchData'

export type UseProDescriptionsOptionsReturned = [
  ComputedRef<ProDescriptionsProps>,
  {
    reload: (params?: any) => Promise<void>
  },
]

interface UseProDescriptionsOptionsPassedData<T> extends Omit<DescriptionsProps, 'columns'> {
  data: T
  columns?: ProDescriptionColumns<T>
}

interface UseProDescriptionsOptionsPassedRequest<T extends AnyFn> extends
  Omit<DescriptionsProps, 'columns'>,
  UseFetchDataBaseOptions<T> {
  columns?: ProDescriptionColumns<Awaited<ReturnType<T>> >
}

interface UseProDescriptionsOptionsPassedRequestTransform<T extends AnyFn, K> extends
  Omit<DescriptionsProps, 'columns'>,
  UseFetchDataOptionsPassedTransform<T, K> {
  columns?: ProDescriptionColumns<Awaited<ReturnType<T>> >
}

type MaybeFunction<T> = T | (() => T)

export function useProDescriptions<T>(
  options: MaybeFunction<UseProDescriptionsOptionsPassedData<T>>
): UseProDescriptionsOptionsReturned

export function useProDescriptions<T extends AnyFn>(
  options: MaybeFunction<UseProDescriptionsOptionsPassedRequest<T>>
): UseProDescriptionsOptionsReturned

export function useProDescriptions<T extends AnyFn, K>(
  options: MaybeFunction<UseProDescriptionsOptionsPassedRequestTransform<T, K>>
): UseProDescriptionsOptionsReturned

export function useProDescriptions<T, K>(
  options:
    | MaybeFunction<UseProDescriptionsOptionsPassedData<T>>
    | MaybeFunction<UseProDescriptionsOptionsPassedRequest<T extends AnyFn ? T : never>>
    | MaybeFunction<UseProDescriptionsOptionsPassedRequestTransform<T extends AnyFn ? T : never, K>>,
): UseProDescriptionsOptionsReturned {
  const [instRef, { reload }] = useProDescriptionsInst()

  const resolvedOptions = computed<ProDescriptionsProps>(() => {
    return isFunction(options) ? options() : options
  })

  const proDescriptionsProps = computed<ProDescriptionsProps>(() => {
    return {
      ref: instRef,
      ...resolvedOptions.value,
    }
  })

  return [
    proDescriptionsProps,
    {
      reload,
    },
  ]
}
