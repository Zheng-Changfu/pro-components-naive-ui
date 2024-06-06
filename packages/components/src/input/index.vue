<script lang="tsx">
import { computed, defineComponent, toRef } from 'vue'
import type { InputProps } from 'naive-ui'
import { NInput } from 'naive-ui'
import { createField, stringifyPath, useCompile } from 'pro-components-hooks'
import { ProFormItem } from '../form'
import { proInputProps } from './props'

export default defineComponent({
  name: 'ProInput',
  props: proInputProps,
  setup(props) {
    const {
      preserve,
      onChange,
      postState,
      transform,
      dependencies,
      initialValue,
    } = props

    const field = createField({
      preserve,
      initialValue,
      dependencies,
      defaultValue: '',
      path: toRef(props, 'path'),
      value: toRef(props, 'value'),
      hidden: toRef(props, 'hidden'),
      visible: toRef(props, 'visible'),
      onChange,
      transform,
      postState,
    })

    const {
      path,
      show,
      value,
      scope,
      doUpdateValue,
    } = field

    const fieldPropsRef = toRef(props, 'fieldProps')

    // 'a' | ({} & string) 这种类型目前暂时无法处理
    const compiledFieldProps = useCompile(fieldPropsRef, scope)

    const getInputProps = computed<InputProps>(() => {
      return {
        ...compiledFieldProps.value as any,
        'pair': false,
        'type': 'text',
        'value': value.value,
        'onUpdateValue': doUpdateValue,
        'onUpdate:value': doUpdateValue,
      }
    })

    const stringPath = computed(() => stringifyPath(path.value))

    return {
      show,
      stringPath,
      getInputProps,
    }
  },
  render() {
    const {
      show,
      $props,
      $attrs,
      stringPath,
      getInputProps,
    } = this
    console.log(show)
    return (
      <ProFormItem v-show={show} {...$props} path={stringPath}>
        <NInput {...$attrs} {...getInputProps} />
      </ProFormItem>
    )
  },
})
</script>
