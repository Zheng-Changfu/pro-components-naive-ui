import type { SlotsType } from 'vue'
import type { ProDescriptionsInst } from './inst'
import type { ProDescriptionsSlots } from './slots'
import { NDescriptions, NSpin } from 'naive-ui'
import { useOmitProps, useOverrideProps } from '../composables'
import { useFetchData } from '../composables/useFetchData'
import { useInjectGlobalConfig } from '../config-provider'
import { useDataSource } from './composables/useDataSource'
import { convertProColumnToDescriptionsItem } from './descriptions-item'
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
    } = useDataSource(overridedProps)

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

    watch(
      () => overridedProps.value.loading,
      value => loading.value = !!value,
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
      nDescriptionsProps,
      columns: computed(() => overridedProps.value.columns ?? []),
    }
  },
  render() {
    const {
      data,
      $slots,
      $attrs,
      loading,
      valueTypeMap,
      nDescriptionsProps,
    } = this

    return (
      <NSpin show={loading}>
        <NDescriptions {...nDescriptionsProps} {...$attrs}>
          {{
            ...this.$slots,
            default: () => {
              return this.columns.map((column) => {
                return convertProColumnToDescriptionsItem({
                  $slots,
                  column,
                  valueTypeMap,
                  dataSource: data,
                })
              })
            },
          }}
        </NDescriptions>
      </NSpin>
    )
  },
})
