import type { MaybeRef } from 'vue'
import type { ProFieldProps } from '../form'
import { isArray } from 'lodash-es'
import { uid } from 'pro-composables'
import { unref } from 'vue'

type PostValue = NonNullable<ProFieldProps['postValue']>

interface PostValueProps {
  postValue?: PostValue
}

interface UsePostValueOptions<
  UndefToNull extends boolean,
  UndefToFalsy extends boolean,
  MapAddUniqueId extends boolean,
  UndefToEmptyArray extends boolean,
  Transform extends PostValue | undefined,
> {
  /**
   * 将 null/undefined 转成 null
   */
  undefToNull?: UndefToNull
  /**
   * 将 null/undefined 转成 false
   */
  undefToFalsy?: UndefToFalsy
  /**
   * 将 null/undefined 转成 []
   */
  undefToEmptyArray?: UndefToEmptyArray
  /**
   * 将数组的每一项添加唯一id
   */
  mapAddUniqueId?: MapAddUniqueId
  /**
   * 自定义转换
   */
  transform?: Transform
}

export const AUTO_CREATE_UNIQUE_ID = 'AUTO_CREATE_UNIQUE_ID'

export function usePostValue<T extends MaybeRef<PostValueProps>, UN extends true, UF extends false, MAUI extends false, UTEA extends false, TF extends undefined>(props: T, options: UsePostValueOptions<UN, UF, MAUI, UTEA, TF>): any
export function usePostValue<T extends MaybeRef<PostValueProps>, UN extends false, UF extends true, MAUI extends false, UTEA extends false, TF extends undefined>(props: T, options: UsePostValueOptions<UN, UF, MAUI, UTEA, TF>): any
export function usePostValue<T extends MaybeRef<PostValueProps>, UN extends false, UF extends false, MAUI extends true, UTEA extends false, TF extends undefined>(props: T, options: UsePostValueOptions<UN, UF, MAUI, UTEA, TF>): any
export function usePostValue<T extends MaybeRef<PostValueProps>, UN extends false, UF extends false, MAUI extends false, UTEA extends true, TF extends undefined>(props: T, options: UsePostValueOptions<UN, UF, MAUI, UTEA, TF>): any
export function usePostValue<T extends MaybeRef<PostValueProps>, UN extends false, UF extends false, MAUI extends false, UTEA extends false, TF extends PostValue>(props: T, options: UsePostValueOptions<UN, UF, MAUI, UTEA, TF>): any
export function usePostValue<T extends MaybeRef<PostValueProps>, UN extends boolean, UF extends boolean, MAUI extends boolean, UTEA extends boolean, TF extends PostValue | undefined>(props: T, options: UsePostValueOptions<UN, UF, MAUI, UTEA, TF>) {
  const {
    transform,
    undefToNull,
    undefToFalsy,
    mapAddUniqueId,
    undefToEmptyArray,
  } = options

  return (value: any) => {
    const { postValue } = unref(props)
    let returnedValue: any

    if (undefToNull) {
      returnedValue = value ?? null
    }
    else if (undefToFalsy) {
      returnedValue = value ?? false
    }
    else if (undefToEmptyArray) {
      returnedValue = value ?? []
    }
    else if (mapAddUniqueId) {
      if (!isArray(value)) {
        returnedValue = []
      }
      returnedValue = returnedValue.map((item: any) => {
        return item[AUTO_CREATE_UNIQUE_ID]
          ? item
          : { ...item, [AUTO_CREATE_UNIQUE_ID]: uid() }
      })
    }
    else if (transform) {
      returnedValue = transform(value)
    }

    return postValue ? postValue(returnedValue) : returnedValue
  }
}
