<markdown>
# 开发自定义组件

我们暴露的组件可能并不能满足您业务需求，你希望可以开发自定义组件以支持在各种表单类型中使用，这里我们封装一个 `pro-json-code(json 代码块)`组件为例，
它也会支持以 `value-type` 的形式在 `pro-search-form` 组件中使用
</markdown>

<script lang="tsx">
import type { InputProps } from 'naive-ui'
import type { ProFieldSharedSlots } from 'pro-naive-ui'
import type { PropType, SlotsType, VNodeChild } from 'vue'
import { inputProps, NInput } from 'naive-ui'
import { createProForm, ProField, proFieldSharedProps, useFieldUtils, useOverrideProps } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

const JsonCode = defineComponent({
  name: 'JsonCode',
  props: inputProps,
  setup() {
    /**
     * 这个工具 composable 包含了一些你可能会用到的属性
     */
    const {
      empty,
      value,
      readonly,
      emptyDom,
    } = useFieldUtils()

    return {
      value,
      empty,
      readonly,
      emptyDom,
    }
  },
  render() {
    let dom: VNodeChild

    if (this.readonly) {
      dom = this.empty
        ? this.emptyDom
        : (
            <pre class="p-16px bg-#ccc">
              <code>{this.value}</code>
            </pre>
          )
    }
    else {
      dom = <NInput {...this.$props} type="textarea" />
    }
    /**
     * 这里将调用用户的 input 插槽(如果存在)，支持用户自定义
     */
    return this.$slots.input
      ? this.$slots.input({
        inputDom: dom,
        readonly: this.readonly,
        inputProps: this.$props,
      })
      : dom
  },
})

const name = 'ProJsonCode'
const XProJsonCode = defineComponent({
  name,
  props: {
    /**
     * 你应该继承公共的属性
     */
    ...proFieldSharedProps,
    fieldProps: Object as PropType<InputProps>,
  },
  /**
   * 这里你应该继承公共的插槽
   */
  slots: Object as SlotsType<ProFieldSharedSlots<InputProps>>,
  setup(props) {
    /**
     * 允许该组件的 props 可以被 pro-config-provider 重写
     */
    const overridedProps = useOverrideProps(
      name,
      props,
    )
    return {
      overridedProps,
    }
  },
  render() {
    return (
      <ProField {...this.overridedProps}>
        {{
          ...this.$slots,
          /**
           * @param pureProps 外界在 fieldProps 中写的属性 + (value + onUpdate:value)
           */
          input: (pureProps: InputProps) => {
            return <JsonCode {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})

export default defineComponent({
  components: {
    XProJsonCode,
  },
  setup() {
    const form = createProForm({
      onSubmit: console.log,
      initialValues: {
        code: `{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "node",
    "jsx": "preserve",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,

    "declaration": true,
    "skipLibCheck": true
  },
  "include": ["**/src", "**/docs", "scripts", "**/demo", ".eslintrc.js"]
}
`,
      },
    })
    return {
      form,
      readonly: ref(true),
    }
  },
})
</script>

<template>
  <n-switch v-model:value="readonly" class="mb-8px">
    <template #checked>
      编辑
    </template>
    <template #unchecked>
      只读
    </template>
  </n-switch>
  <pro-form :readonly="readonly" :form="form" label-placement="left" label-width="auto">
    <XProJsonCode
      title="json 代码块"
      tooltip="代码块"
      path="code"
      :field-props="{
        autosize: true,
      }"
    />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
