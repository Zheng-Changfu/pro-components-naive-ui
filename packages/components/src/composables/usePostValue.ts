import type { MaybeRef } from 'vue'
import type { ProFieldProps } from '../form'
import { unref } from 'vue'

type PostValue = NonNullable<ProFieldProps['postValue']>

interface PostValueProps {
  postValue?: PostValue
}

interface UsePostValueOptions<
  NilToNull extends boolean,
  NilToFalsy extends boolean,
  NilToEmptyArray extends boolean,
  Transform extends PostValue | undefined,
> {
  /**
   * 将 null/undefined 转成 null
   */
  nilToNull?: NilToNull
  /**
   * 将 null/undefined 转成 false
   */
  nilToFalsy?: NilToFalsy
  /**
   * 将 null/undefined 转成 []
   */
  nilToEmptyArray?: NilToEmptyArray
  /**
   * 自定义转换
   */
  transform?: Transform
}

export function usePostValue<T extends MaybeRef<PostValueProps>, NN extends true, NF extends false, NEA extends false, TF extends undefined>(props: T, options: UsePostValueOptions<NN, NF, NEA, TF>): any
export function usePostValue<T extends MaybeRef<PostValueProps>, NN extends false, NF extends true, NEA extends false, TF extends undefined>(props: T, options: UsePostValueOptions<NN, NF, NEA, TF>): any
export function usePostValue<T extends MaybeRef<PostValueProps>, NN extends false, NF extends false, NEA extends true, TF extends undefined>(props: T, options: UsePostValueOptions<NN, NF, NEA, TF>): any
export function usePostValue<T extends MaybeRef<PostValueProps>, NN extends false, NF extends false, NEA extends false, TF extends PostValue>(props: T, options: UsePostValueOptions<NN, NF, NEA, TF>): any
export function usePostValue<T extends MaybeRef<PostValueProps>, NN extends boolean, NF extends boolean, NEA extends boolean, TF extends PostValue | undefined>(props: T, options: UsePostValueOptions<NN, NF, NEA, TF>) {
  const {
    transform,
    nilToNull,
    nilToFalsy,
    nilToEmptyArray,
  } = options

  return (value: any) => {
    const { postValue } = unref(props)
    let returnedValue: any
    if (nilToNull) {
      returnedValue = value ?? null
    }
    else if (nilToFalsy) {
      returnedValue = value ?? false
    }
    else if (nilToEmptyArray) {
      returnedValue = value ?? []
    }
    else if (transform) {
      returnedValue = transform(value)
    }
    return postValue ? postValue(returnedValue) : returnedValue
  }
}
