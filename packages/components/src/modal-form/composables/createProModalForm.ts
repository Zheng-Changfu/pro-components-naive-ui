import type { Ref } from 'vue'
import type { CreateProFormOptions, ExtendProForm } from '../../form/composables/createProForm'
import { extendProForm, useInjectProForm } from '../../form/composables/createProForm'

export type CreateProModalFormReturn<Values = any> = ExtendProForm<
  Values,
  {
    /**
     * 打开弹窗
     */
    open: () => void
    /**
     * 关闭弹窗
     */
    close: () => void
  },
  {
    show: Ref<boolean>
  }
>
export function createProModalForm<Values = any>(options: CreateProFormOptions<Values> = {}): CreateProModalFormReturn<Values> {
  const show = ref(false)
  return extendProForm(options, {
    open: () => {
      show.value = true
    },
    close: () => {
      show.value = false
    },
  }, { show })
}

export function useInjectProModalForm<Values = any>() {
  return useInjectProForm() as any as CreateProModalFormReturn<Values> | undefined
}
