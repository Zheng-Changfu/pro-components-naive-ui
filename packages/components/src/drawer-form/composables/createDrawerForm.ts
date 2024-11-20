import type { Ref } from 'vue'
import type { CreateProFormOptions, ExtendProForm } from '../../form/composables/createProForm'
import { extendProForm, useInjectProForm } from '../../form/composables/createProForm'

export type CreateDrawerFormReturn<Values = any> = ExtendProForm<
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
export function createDrawerForm<Values = any>(options: CreateProFormOptions<Values> = {}): CreateDrawerFormReturn<Values> {
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

export function useInjectDrawerForm<Values = any>() {
  return useInjectProForm() as any as CreateDrawerFormReturn<Values> | undefined
}
