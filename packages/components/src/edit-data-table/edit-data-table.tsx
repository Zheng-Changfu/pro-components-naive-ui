import type { SlotsType } from 'vue'
import type { ProEditDataTableSlots } from './slots'
import { omit, pick } from 'lodash-es'
import { computed, defineComponent } from 'vue'
import { useOverrideProps } from '../composables'
import { proFieldProps as _proFieldProps, ProField } from '../form'
import EditDataTable from './components/edit-data-table'
import { provideEditDataTableInstStore } from './inst'
import { proEditDataTableProps } from './props'

const name = 'ProEditDataTable'
export default defineComponent({
  name,
  props: proEditDataTableProps,
  slots: Object as SlotsType<ProEditDataTableSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideEditDataTableInstStore()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const proFieldProps = computed(() => {
      return pick(overridedProps.value, Object.keys(_proFieldProps))
    })

    const fieldDataTableProps = computed(() => {
      const fieldProps = overridedProps.value.fieldProps
      return {
        ...omit(overridedProps.value, Object.keys(_proFieldProps)),
        ...fieldProps,
        style: {
          width: '100%',
          ...((fieldProps.style as any) ?? {}),
        },
      }
    })

    expose(exposed)
    return {
      proFieldProps,
      fieldDataTableProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.proFieldProps}
        isList={true}
        valueModelName=""
        fieldProps={this.fieldDataTableProps}
      >
        {{
          input: (pureProps: any) => {
            return (
              <EditDataTable
                {...pureProps}
                v-slots={this.$slots}
              />
            )
          },
        }}
      </ProField>
    )
  },
})
