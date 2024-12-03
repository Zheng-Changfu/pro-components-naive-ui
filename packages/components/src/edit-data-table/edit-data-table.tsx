import type { SlotsType } from 'vue'
import type { ProEditDataTableSlots } from './slots'
import { pick } from 'lodash-es'
import { computed, defineComponent } from 'vue'
import { simplyOmit } from '../_utils/simplyOmit'
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
      return pick(
        overridedProps.value,
        Object.keys(_proFieldProps),
      )
    })

    const proDataTableProps = computed(() => {
      const fieldProps = overridedProps.value ?? {}
      return {
        ...fieldProps,
        ...simplyOmit(
          overridedProps.value,
          Object.keys(_proFieldProps) as any,
        ),
        // style: {
        //   width: '100%',
        //   ...((fieldProps.style as any) ?? {}),
        // },
      }
    })

    expose(exposed)
    return {
      proFieldProps,
      proDataTableProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.proFieldProps}
        isList={true}
        valueModelName=""
        fieldProps={this.proDataTableProps}
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
