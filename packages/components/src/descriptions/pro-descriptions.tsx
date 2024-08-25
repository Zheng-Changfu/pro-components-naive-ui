import type { SlotsType } from 'vue'
import { NDescriptions, NDescriptionsItem, NSpin } from 'naive-ui'
import { isFunction } from 'lodash-es'
import { createForm, uid } from 'pro-components-hooks'
import { useInjectGlobalConfig } from '../config-provider'
import { useOmitProps } from '../hooks'
import { proDescriptionsExtendProps, proDescriptionsProps } from './props'
import type { ProDescriptionsSlots } from './slots'
import { useFetchData } from './composables/useFetchData'

export default defineComponent({
  name: 'ProDescriptions',
  props: proDescriptionsProps,
  slots: Object as SlotsType<ProDescriptionsSlots>,
  setup(props, { expose }) {
    const {
      getFieldsValue,
      setFieldsValue,
    } = createForm({
      initialValues: props.data ?? {},
    })

    const {
      reload,
      loading,
      onRequestSuccess,
    } = useFetchData(props)

    const {
      valueTypeMap,
    } = useInjectGlobalConfig()

    const nDescriptionsProps = useOmitProps(
      props,
      proDescriptionsExtendProps,
    )

    const data = computed(() => {
      return getFieldsValue(true)
    })

    const normalizedColumns = computed(() => {
      return (props.columns ?? []).filter(Boolean).map((column) => {
        return {
          ...column,
          uid: uid(),
        }
      })
    })

    watch(
      toRef(props, 'data'),
      (value) => {
        setFieldsValue(value ?? {}, 'overwrite')
      },
      { deep: true },
    )

    onRequestSuccess((res) => {
      setFieldsValue(res ?? {}, 'overwrite')
    })

    expose({
      reload,
    })
    return {
      data,
      loading,
      valueTypeMap,
      normalizedColumns,
      nDescriptionsProps,
    }
  },
  render() {
    const {
      data,
      loading,
      valueTypeMap,
      normalizedColumns,
      nDescriptionsProps,
    } = this

    return (
      <NSpin show={loading}>
        <NDescriptions {...nDescriptionsProps}>
          {{
            ...this.$slots,
            default: () => {
              return normalizedColumns.map((column) => {
                const {
                  uid,
                  key,
                  path,
                  label,
                  slots,
                  title,
                  render,
                  fieldProps,
                  valueType = 'input',
                  ...nDescriptionsItemProps
                } = column

                return (
                  <NDescriptionsItem key={key ?? uid} {...nDescriptionsItemProps}>
                    {{
                      label: () => {
                        const resolvedTitle = isFunction(title) ? title() : title
                        const resolvedLabel = isFunction(label) ? label() : label
                        return resolvedTitle ?? resolvedLabel
                      },
                      default: () => {
                        if (render) {
                          return render(data)
                        }
                        const Comp = valueTypeMap[valueType]
                        if (!Comp) {
                          return null
                        }
                        return h(Comp, {
                          path,
                          fieldProps,
                          simple: true,
                          readonly: true,
                        }, slots)
                      },
                    }}
                  </NDescriptionsItem>
                )
              })
            },
          }}
        </NDescriptions>
      </NSpin>
    )
  },
})
