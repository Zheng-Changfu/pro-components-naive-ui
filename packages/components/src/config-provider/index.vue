<script  lang='tsx'>
import { computed, defineComponent, unref } from 'vue'
import { NConfigProvider } from 'naive-ui'
import { useOmitProps } from '../hooks'
import { proConfigProviderExtendProps, proConfigProviderProps } from './props'
import { provideGlobalConfigContext, useInjectGlobalConfigContext } from './context'

export default defineComponent({
  name: 'ProConfigProvider',
  props: proConfigProviderProps,
  setup(props) {
    const configProviderProps = useOmitProps(props, proConfigProviderExtendProps)

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

    const proForm = computed(() => {
      const { proForm } = props
      return proForm !== undefined ? proForm : unref(parentProForm)
    })

    const proTable = computed(() => {
      const { proTable } = props
      return proTable !== undefined ? proTable : unref(parentProTable)
    })

    const proButton = computed(() => {
      const { proButton } = props
      return proButton !== undefined ? proButton : unref(parentProButton)
    })

    const proUpload = computed(() => {
      const { proUpload } = props
      return proUpload !== undefined ? proUpload : unref(parentProUpload)
    })

    const proRequest = computed(() => {
      const { proRequest } = props
      return proRequest !== undefined ? proRequest : unref(parentProRequest)
    })

    provideGlobalConfigContext({
      proForm,
      proTable,
      proButton,
      proUpload,
      proRequest,
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
