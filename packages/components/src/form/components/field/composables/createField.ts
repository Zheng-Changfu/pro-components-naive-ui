import type { FieldOptions } from 'pro-composables'
import type { ProFieldProps } from '../props'
import { createField as _createField, createArrayField } from 'pro-composables'
import { toRef } from 'vue'

export function createField(props: ProFieldProps) {
  const {
    isList,
    preserve,
    onChange,
    postValue,
    transform,
    onInputValue,
    dependencies,
    initialValue,
  } = props

  const options: FieldOptions = {
    preserve,
    initialValue,
    dependencies,
    path: toRef(props, 'path'),
    value: toRef(props, 'value'),
    hidden: toRef(props, 'hidden'),
    visible: toRef(props, 'visible'),
    onChange,
    transform,
    postValue,
    onInputValue,
  }

  return isList ? createArrayField(options) : _createField(options)
}
