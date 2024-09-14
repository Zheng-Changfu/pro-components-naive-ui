import type { ProDescriptionsInst } from './inst'
import type { ProDescriptionsSlots } from './slots'
import { InfoCircleOutlined } from '@vicons/antd'
import { isFunction, isString } from 'lodash-es'
import { NDescriptions, NDescriptionsItem, NEl, NIcon, NSpin, NTooltip } from 'naive-ui'
import { createForm, uid } from 'pro-components-hooks'
import { Fragment, type SlotsType } from 'vue'
import { useOmitProps } from '../composables'
import { useInjectGlobalConfig } from '../config-provider'
import { useFetchData } from './composables/useFetchData'
import { proDescriptionsExtendProps, proDescriptionsProps } from './props'

export default defineComponent({
  name: 'ProDescriptions',
  inheritAttrs: false,
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
        const {
          label,
          title,
          tooltip,
          valueType = 'input',
          ...rest
        } = column
        return {
          ...rest,
          uid: uid(),
          valueType,
          title: title ?? label,
          tooltip: isString(tooltip) ? [tooltip] : [tooltip].filter(Boolean) as any as string[],
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

    watch(
      toRef(props, 'loading'),
      v => loading.value = !!v,
    )

    onRequestSuccess((res) => {
      setFieldsValue(res ?? {}, 'overwrite')
    })

    const exposed: ProDescriptionsInst = {
      reload,
    }

    expose(exposed)
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
      $attrs,
      loading,
      valueTypeMap,
      normalizedColumns,
      nDescriptionsProps,
    } = this

    return (
      <NSpin show={loading}>
        <NDescriptions {...nDescriptionsProps} {...$attrs}>
          {{
            ...this.$slots,
            default: () => {
              return normalizedColumns.map((column) => {
                const {
                  uid,
                  key,
                  path,
                  slots,
                  title,
                  render,
                  tooltip,
                  valueType,
                  fieldProps,
                  addonAfter,
                  addonBefore,
                  ...nDescriptionsItemProps
                } = column
                return (
                  <NDescriptionsItem key={key ?? uid} {...nDescriptionsItemProps}>
                    {{
                      label: () => {
                        const resolvedTitle = isFunction(title) ? title() : title
                        if (!resolvedTitle) {
                          return null
                        }
                        return (
                          <Fragment>
                            {resolvedTitle}
                            {tooltip.length > 0 && (
                              <NTooltip trigger="hover">
                                {{
                                  trigger: () => {
                                    return (
                                      <NIcon
                                        size={16}
                                        style={{
                                          cursor: 'pointer',
                                          verticalAlign: 'text-bottom',
                                          marginInlineStart: '4px',
                                        }}
                                      >
                                        <InfoCircleOutlined />
                                      </NIcon>
                                    )
                                  },
                                  default: () => {
                                    return tooltip.map((t, i) => {
                                      return <NEl key={i + t}>{t}</NEl>
                                    })
                                  },
                                }}
                              </NTooltip>
                            )}
                          </Fragment>
                        )
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
                          addonAfter,
                          addonBefore,
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
