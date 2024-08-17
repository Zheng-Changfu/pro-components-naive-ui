<script setup lang="tsx">
import type { FormInst, FormProps } from 'naive-ui'
import { NForm } from 'naive-ui'
import type { BaseField, Path } from 'pro-components-hooks'
import { createForm, stringifyPath, useCompile } from 'pro-components-hooks'
import { computed, nextTick, provide, ref, toRef } from 'vue'
import { isString, toPath } from 'lodash-es'
import { useOmitProps } from '../hooks'
import { useInjectGlobalConfig } from '../config-provider'
import { proFormContextKey, provideProFormInst } from './context'
import type { ValidateError } from './props'
import { proFormExtendProps, proFormProps } from './props'
import type { ProFormInst } from './inst'
import type { FieldExtraInfo } from './components'
import { fieldExtraKey } from './components'
import { useValidateResults } from './composables/useValidateResult'
import type { ProFormSlots } from './slots'

defineOptions({
  name: 'ProForm',
})
const props = defineProps(proFormProps)
defineSlots<ProFormSlots>()

const formInstRef = ref<FormInst>()
const formProps = useOmitProps(props, proFormExtendProps)

const {
  scope: globalScope,
} = useInjectGlobalConfig().proForm

const {
  addValidateErrors,
  addValidateWarnings,
  clearValidateResults,
  getFieldValidateResult,
} = useValidateResults()

const {
  initialValues,
  scope: propScope,
  onFieldValueChange,
} = props

const expressionScope = {
  ...(globalScope ?? {}),
  ...(propScope ?? {}),
}

const {
  scope,
  matchPath,
  fieldStore,
  valueStore,
  getFieldValue,
  setFieldValue,
  getFieldsValue,
  setFieldsValue,
  setInitialValue,
  resetFieldValue,
  resetFieldsValue,
  setInitialValues,
  pauseDependenciesTrigger,
  resumeDependenciesTrigger,
  getFieldsTransformedValue,
} = createForm({
  initialValues,
  expressionScope,
  onFieldValueChange,
  onDependenciesValueChange,
})

const parsedDisabled = useCompile(toRef(props, 'disabled'), { scope })
const parsedReadonly = useCompile(toRef(props, 'readonly'), { scope })

const nFormProps = computed<FormProps>(() => {
  return {
    ...formProps.value,
    rules: undefined,
    ref: formInstRef,
    model: valueStore.values.value,
    disabled: parsedDisabled.value,
  }
})

function onDependenciesValueChange(opt: {
  value: any
  path: string[]
  field: BaseField
  dependPath: string[]
}) {
  const {
    field,
    path,
    value,
    dependPath,
  } = opt

  if (field.show.value) {
    validate(stringifyPath(opt.dependPath))
    if (props.onDependenciesValueChange) {
      props.onDependenciesValueChange({ path, value, dependPath })
    }
  }
}

function submit() {
  const {
    onSubmit,
    onSubmitFailed,
  } = props

  return validate()
    .then(({ warnings }) => {
      const values = getFieldsTransformedValue()
      onSubmit && onSubmit(values, warnings ?? [])
    })
    .catch((errors) => {
      onSubmitFailed && onSubmitFailed(errors)
    })
}

function validate(paths?: string | string[]) {
  if (!paths) {
    return formInstRef.value!.validate(addValidateResults)
  }
  paths = (isString(paths) ? [paths] : paths).map(stringifyPath)
  return formInstRef.value!.validate(
    addValidateResults,
    rule => paths.includes(rule.key!),
  )
}

function restoreValidation(paths?: string | string[]) {
  if (!paths) {
    formInstRef.value!.restoreValidation()
    return
  }
  const normalizedPaths = (isString(paths) ? [paths] : paths).map(stringifyPath) as Array<string>
  normalizedPaths.forEach((path) => {
    const field = fieldStore.fieldsPathMap.value.get(path)
    if (!field || !field[fieldExtraKey])
      return
    const { proFormItemInst } = field[fieldExtraKey] as FieldExtraInfo
    const formItemInst = proFormItemInst.value
    formItemInst && formItemInst.restoreValidation()
  })
}

function restoreFieldValue(path: Path) {
  pauseDependenciesTrigger()
  resetFieldValue(path)
  clearValidateResults(path)
  restoreValidation(toPath(path))
  nextTick(resumeDependenciesTrigger)
}

function restoreFieldsValue() {
  pauseDependenciesTrigger()
  resetFieldsValue()
  restoreValidation()
  clearValidateResults()
  nextTick(resumeDependenciesTrigger)
}

function addValidateResults(
  errors: ValidateError[][] | undefined,
  extra: {
    warnings: ValidateError[][] | undefined
  },
) {
  const es = errors ?? []
  const ws = extra.warnings ?? []
  clearValidateResults()

  es.forEach((e) => {
    const path = e[0].field
    addValidateErrors(path, e)
  })

  ws.forEach((e) => {
    const path = e[0].field
    addValidateWarnings(path, e)
  })
}

const exposed: ProFormInst = {
  submit,
  validate,
  matchPath,
  getFieldValue,
  setFieldValue,
  getFieldsValue,
  setFieldsValue,
  resetFieldValue,
  setInitialValue,
  setInitialValues,
  resetFieldsValue,
  restoreValidation,
  restoreFieldValue,
  restoreFieldsValue,
  getScope: () => scope,
  getFieldValidateResult,
  pauseDependenciesTrigger,
  getFieldsTransformedValue,
  resumeDependenciesTrigger,
}

provideProFormInst(exposed)
provide(proFormContextKey, {
  addValidateErrors,
  addValidateWarnings,
  clearValidateResults,
  readonly: parsedReadonly,
  validateBehavior: toRef(props, 'validateBehavior'),
  validateBehaviorProps: toRef(props, 'validateBehaviorProps'),
})

defineExpose(exposed)
</script>

<template>
  <NForm v-bind="nFormProps">
    <slot name="default" />
  </NForm>
</template>
