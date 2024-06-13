<script  lang='tsx'>
import { defineComponent } from 'vue'
import { NConfigProvider } from 'naive-ui'
import { toString } from 'lodash-es'
import { useOmitProps } from '../hooks'
import { proConfigProviderExtendProps, proConfigProviderProps } from './props'
import { provideGlobalConfigContext, useInjectGlobalConfigContext } from './context'
import type { ProComponentGlobalConfig } from './types'

export default defineComponent({
  name: 'ProConfigProvider',
  props: proConfigProviderProps,
  setup(props) {
    const configProviderProps = useOmitProps(props, proConfigProviderExtendProps)

    const {
      proForm = {},
      proTable = {},
      proButton = {},
      proUpload = {},
      proRequest = {},
    } = props

    function builtInPlaceholderRender(options: ProComponentGlobalConfig) {
      const { type, formItemProps } = options
      const { label } = formItemProps
      switch (type) {
        case 'input':
          return `请输入${toString(label?.value)}`
      }
    }

    function builtInValidateMessageRender(options: ProComponentGlobalConfig) {
      const { type, formItemProps } = options
      const { label } = formItemProps
      switch (type) {
        case 'input':
          return `${toString(label?.value)}为必填字段`
      }
    }

    /**
     * 可能会嵌套，自己取不到，取上层的
     */
    const {
      proForm: parentProForm,
      proTable: parentProTable,
      proButton: parentProButton,
      proUpload: parentProUpload,
      proRequest: parentProRequest,
    } = useInjectGlobalConfigContext()

    provideGlobalConfigContext({
      proForm: {
        validateTrigger: 'input',
        placeholderRender: builtInPlaceholderRender,
        validateMessageRender: builtInValidateMessageRender,
        ...parentProForm,
        ...proForm,
      },
      proTable: {
        ...parentProTable,
        ...proTable,
      },
      proButton: {
        ...parentProButton,
        ...proButton,
      },
      proUpload: {
        ...parentProUpload,
        ...proUpload,
      },
      proRequest: {
        ...parentProRequest,
        ...proRequest,
      },
    })
    return {
      configProviderProps,
    }
  },
  render() {
    const {
      $slots,
      configProviderProps,
    } = this
    return <NConfigProvider {...configProviderProps} v-slots={$slots}></NConfigProvider>
  },
})
</script>
