<script setup lang="tsx">
import type { FormInst, FormProps } from 'naive-ui'
import type { BaseField, Path } from 'pro-components-hooks'
import type { FieldExtraInfo } from './components'
import type { ProFormInst } from './inst'
import type { ValidateError } from './props'
import type { ProFormSlots } from './slots'
import { isString, toPath } from 'lodash-es'
import { NForm } from 'naive-ui'
import { createForm, stringifyPath, useCompile } from 'pro-components-hooks'
import { computed, nextTick, provide, ref, toRef } from 'vue'
import { useOmitProps } from '../composables'
import { useInjectGlobalConfig } from '../config-provider'
import { fieldExtraKey } from './components'
import { useValidateResults } from './composables/useValidateResult'
import { proFormContextKey, provideProFormInst } from './context'
import { proFormExtendProps, proFormProps } from './props'

defineOptions({
  name: 'ProForm',
})
const props = defineProps(proFormProps)
defineSlots<ProFormSlots>()

const formInstRef = ref<FormInst>()
const formProps = useOmitProps(props, proFormExtendProps)

const {
  proForm,
} = useInjectGlobalConfig()

const {
  addValidateErrors,
  addValidateWarnings,
  clearValidateResults,
  getFieldValidateResult,
} = useValidateResults()

const {
  initialValues,
  onFieldValueChange,
} = props

const expressionScope = computed(() => {
  return {
    ...(proForm.scope ?? {}),
    ...(props.scope ?? {}),
  }
})

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
    onSubmit: (e) => {
      e.preventDefault()
      submit()
    },
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
      return onSubmit && onSubmit(values, warnings ?? [])
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
  getFieldValidateResult,
  pauseDependenciesTrigger,
  getFieldsTransformedValue,
  resumeDependenciesTrigger,
  getScope: () => scope.value,
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
