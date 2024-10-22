import { createForm } from 'pro-components-hooks'

export function useValueTypeForm() {
  /**
   * 让 valueType 对应的组件可以正常渲染，必须在上层注入一个 form
   */
  return {
    form: createForm({}),
  }
}
