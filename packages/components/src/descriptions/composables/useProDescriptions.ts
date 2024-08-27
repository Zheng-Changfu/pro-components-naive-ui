import { isFunction } from 'lodash-es'
import type { AnyFn } from '../../types'
import type { ProDescriptionsProps } from '../props'
import type { ProDescriptionColumns } from '../types'
import { useProDescriptionsInst } from '../inst'
import type { UseFetchDataOptions } from './useFetchData'

/**
 * 重写请求类型和 columns、data 类型
 */
export interface UseProDescriptionsOptions<
DataSource = void,
RequestFn extends AnyFn = AnyFn,
> extends
  Omit<ProDescriptionsProps, keyof UseFetchDataOptions | 'columns' | 'data'>,
  UseFetchDataOptions<RequestFn> {
  data?: DataSource
  columns?: DataSource extends void
    ? ProDescriptionColumns<Awaited<ReturnType<RequestFn>>>
    : ProDescriptionColumns<DataSource>
}

export type UseProDescriptionsOptionsReturned = [
  ComputedRef<ProDescriptionsProps>,
  {
    reload: (params?: any) => Promise<void>
  },
]

export function useProDescriptions<
DataSource = void,
RequestFn extends AnyFn = AnyFn,
>(options: UseProDescriptionsOptions<DataSource, RequestFn> | (() => UseProDescriptionsOptions<DataSource, RequestFn>)): UseProDescriptionsOptionsReturned {
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
