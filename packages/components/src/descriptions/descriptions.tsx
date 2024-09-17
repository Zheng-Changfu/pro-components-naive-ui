import type { SlotsType } from 'vue'
import type { ProDescriptionsInst } from './inst'
import type { ProDescriptionsSlots } from './slots'
import { InfoCircleOutlined } from '@vicons/antd'
import { isFunction, isString } from 'lodash-es'
import { NDescriptions, NDescriptionsItem, NEl, NIcon, NSpin, NTooltip } from 'naive-ui'
import { uid } from 'pro-components-hooks'
import { useOmitProps, useOverrideProps } from '../composables'
import { useFetchData } from '../composables/useFetchData'
import { useInjectGlobalConfig } from '../config-provider'
import { useData } from './composables/useData'
import { proDescriptionsExtendProps, proDescriptionsProps } from './props'

const name = 'ProDescriptions'
export default defineComponent({
  name,
  inheritAttrs: false,
  props: proDescriptionsProps,
  slots: Object as SlotsType<ProDescriptionsSlots>,
  setup(props, { expose }) {
    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const {
      data,
      setData,
    } = useData(overridedProps)

    const {
      reload,
      loading,
      onRequestSuccess,
    } = useFetchData(overridedProps)

    const {
      valueTypeMap,
    } = useInjectGlobalConfig()

    const nDescriptionsProps = useOmitProps(
      overridedProps,
      proDescriptionsExtendProps,
    )

    const normalizedColumns = computed(() => {
      const columns = overridedProps.value.columns ?? []
      return columns
        .filter(Boolean)
        .map((column) => {
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
      computed(() => overridedProps.value.loading),
      v => loading.value = !!v,
    )

    onRequestSuccess((res) => {
      setData(res ?? {}, 'overwrite')
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
                        return [
                          resolvedTitle,
                          tooltip.length > 0 && (
                            <NTooltip trigger="hover">
                              {{
                                trigger: () => [
                                  <NIcon
                                    size={16}
                                    style={{
                                      cursor: 'pointer',
                                      verticalAlign: 'text-bottom',
                                      marginInlineStart: '4px',
                                    }}
                                  >
                                    <InfoCircleOutlined />
                                  </NIcon>,
                                ],
                                default: () => [
                                  tooltip.map((t, i) => {
                                    return <NEl key={i + t}>{t}</NEl>
                                  }),
                                ],
                              }}
                            </NTooltip>
                          ),
                        ]
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
