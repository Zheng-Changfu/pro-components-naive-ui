import { pick } from 'lodash-es'
import { compile } from 'pro-components-hooks'
import { useInjectGlobalConfig } from '../../../../config-provider'
import type { ProFormProps } from '../../../../form'
import { proFormProps as formProps, useProFormInst } from '../../../../form'
import type { ProSearchFormProps } from '../props'
import type { ProSearchFormColumn } from '../types'

export function useGridForm(props: ProSearchFormProps) {
  const [formInstRef, formMethods] = useProFormInst()

  const {
    scope: globalScope,
  } = useInjectGlobalConfig().proForm

  const proFormProps = computed<ProFormProps>(() => {
    return {
      ref: formInstRef,
      ...pick(props, Object.keys(formProps)),
      onSubmit,
    }
  })

  function getColumnScope(column: ProSearchFormColumn) {
    const values = formInstRef.value?.getFieldsValue(true) ?? true
    const selfValue = formInstRef.value?.getFieldValue(column.path ?? '')
    const builtinScope = {
      $row: {},
      $total: 0,
      $index: -1,
      $record: {},
      $rowIndex: -1,
      $vals: values,
      $values: values,
      $self: selfValue,
    }

    return {
      ...builtinScope,
      ...(globalScope ?? {}),
      ...(props.scope ?? {}),
    }
  }

  function getColumnVisible(column: ProSearchFormColumn) {
    const { visible, hidden } = column
    if (visible === undefined || hidden === undefined) {
      return true
    }
    /**
     * 由于 NGrid 无法被二次封装，所以这里要对 visible 和 hidden 进行二次编译
     * 防止表单被隐藏后，NGi 没有被隐藏问题
     */
    const scope = getColumnScope(column)
    return visible !== undefined
      ? compile(visible, scope)
      : !compile(hidden, scope)
  }

  function reset() {
    const form = formInstRef.value
    if (!form)
      return

    const { onReset } = props
    form.restoreFieldsValue()
    onReset && onReset()
  }

  function onSubmit(values: any, warnings: any) {
    const { onSubmit, onSearch } = props
    onSearch && onSearch(values)
    onSubmit && onSubmit(values, warnings)
  }

  function search() {
    const form = formInstRef.value
    if (!form)
      return

    form.submit()
  }

  return {
    reset,
    search,
    formMethods,
    formInstRef,
    proFormProps,
    getColumnVisible,
  }
}
