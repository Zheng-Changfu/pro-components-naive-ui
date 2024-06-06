<script lang="tsx">
import type { FormProps } from 'naive-ui'
import { NButton, NForm } from 'naive-ui'
import { createForm } from 'pro-components-hooks'
import { computed, defineComponent } from 'vue'
import { proFormProps } from './props'

export default defineComponent({
  name: 'ProForm',
  props: proFormProps,
  setup(props) {
    const {
      initialValues,
      expressionContext,
      onFieldValueChange,
      onDependenciesValueChange,
    } = props

    const { values, getFieldsValue } = createForm({
      initialValues,
      expressionContext,
      onFieldValueChange,
      onDependenciesValueChange,
    })

    const getFormProps = computed<FormProps>(() => {
      const {
        initialValues,
        expressionContext,
        onFieldValueChange,
        onDependenciesValueChange,
        ...formProps
      } = props
      return {
        ...formProps,
        model: values.value,
      }
    })

    return {
      getFormProps,
      getFieldsValue,
    }
  },
  render() {
    const {
      $attrs,
      $slots,
      getFormProps,
      getFieldsValue,
    } = this
    return (
      <div>
        <NButton onClick={() => {
          console.log(getFieldsValue())
          console.log(getFieldsValue(true))
        }}
        >
          values
        </NButton>
        <NForm {...getFormProps} {...$attrs} v-slots={$slots}></NForm>
      </div>
    )
  },
})
</script>
