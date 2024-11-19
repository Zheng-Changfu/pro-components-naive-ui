import type { Simplify } from 'type-fest'
import type { Ref } from 'vue'
import type { CreateProFormOptions, CreateProFormReturn } from '../../form/composables/createProForm'
import { createProForm } from '../../form/composables/createProForm'

const proModalFormContextKey = Symbol('proModalForm')
export const proModalFormInternalKey = Symbol('proModalFormInternalKey')

export type CreateProModalFormReturn<Values = any> = Simplify<
  CreateProFormReturn<Values> & {
    /**
     * 打开弹窗
     */
    open?: () => void
    /**
     * 关闭弹窗
     */
    close?: () => void
    /**
     * 内部使用
     */
    [proModalFormInternalKey]: {
      show: Ref<boolean>
    }
  }
>

type CreateProModalFormOptions<Values = any> = CreateProFormOptions<Values>
export function createProModalForm<Values = any>(options: CreateProModalFormOptions<Values> = {}): CreateProModalFormReturn<Values> {
  const show = ref(false)
  const form = createProForm(options)

  const returned: CreateProModalFormReturn = {
    ...form,
    open: () => show.value = true,
    close: () => show.value = false,
    [proModalFormInternalKey]: {
      show,
    },
  }
  return Object.freeze(returned)
}

export function provideProModalForm(modalForm: CreateProModalFormReturn) {
  provide(proModalFormContextKey, modalForm)
}

export function useInjectProModalForm<Values = any>(): CreateProModalFormReturn<Values> | undefined {
  return inject(proModalFormContextKey)
}
