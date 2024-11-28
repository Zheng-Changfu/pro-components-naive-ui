import type { MaybeRef } from 'vue'
import type { ProFieldProps } from '../form'
import { unref } from 'vue'

type PostValue = NonNullable<ProFieldProps['postValue']>

interface PostValueProps {
  postValue?: PostValue
}

interface UsePostValueOptions<
  UndefToNull extends boolean,
  UndefToFalsy extends boolean,
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
   * 自定义转换
   */
  transform?: Transform
}

export const AUTO_CREATE_UNIQUE_ID = 'AUTO_CREATE_UNIQUE_ID'

export function usePostValue<T extends MaybeRef<PostValueProps>, UN extends true, UF extends false, UTEA extends false, TF extends undefined>(props: T, options: UsePostValueOptions<UN, UF, UTEA, TF>): any
export function usePostValue<T extends MaybeRef<PostValueProps>, UN extends false, UF extends true, UTEA extends false, TF extends undefined>(props: T, options: UsePostValueOptions<UN, UF, UTEA, TF>): any
export function usePostValue<T extends MaybeRef<PostValueProps>, UN extends false, UF extends false, UTEA extends true, TF extends undefined>(props: T, options: UsePostValueOptions<UN, UF, UTEA, TF>): any
export function usePostValue<T extends MaybeRef<PostValueProps>, UN extends false, UF extends false, UTEA extends false, TF extends PostValue>(props: T, options: UsePostValueOptions<UN, UF, UTEA, TF>): any
export function usePostValue<T extends MaybeRef<PostValueProps>, UN extends boolean, UF extends boolean, UTEA extends boolean, TF extends PostValue | undefined>(props: T, options: UsePostValueOptions<UN, UF, UTEA, TF>) {
  const {
    transform,
    undefToNull,
    undefToFalsy,
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
    else if (transform) {
      returnedValue = transform(value)
    }

    return postValue ? postValue(returnedValue) : returnedValue
  }
}
