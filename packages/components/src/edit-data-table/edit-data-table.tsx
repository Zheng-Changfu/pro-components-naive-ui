import type { SlotsType } from 'vue'
import type { ProEditDataTableSlots } from './slots'
import { computed, defineComponent } from 'vue'
import { keep } from '../_utils/keep'
import { useOverrideProps } from '../composables'
import { proFieldProps as _proFieldProps, pickProListFieldSharedProps, ProField } from '../form'
import EditDataTable from './components/edit-data-table'
import { provideEditDataTableInstStore } from './inst'
import { internalEditDataTablePropKeys, proEditDataTableProps } from './props'

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
      return pickProListFieldSharedProps(overridedProps.value)
    })

    const internalEditDataTableProps = computed(() => {
      const {
        // #region 冲突的属性
        size,
        theme,
        title,
        tooltip,
        themeOverrides,
        builtinThemeOverrides,
        // #endregion
        ...restProps
      } = overridedProps.value

      return keep(
        restProps,
        internalEditDataTablePropKeys,
      )
    })

    expose(exposed)
    return {
      proFieldProps,
      internalEditDataTableProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.proFieldProps}
        isList={true}
        valueModelName=""
        fieldProps={this.internalEditDataTableProps}
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
