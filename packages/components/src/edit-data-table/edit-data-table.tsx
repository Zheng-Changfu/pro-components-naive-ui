import type { SlotsType } from 'vue'
import type { ProEditDataTableSlots } from './slots'
import { isArray, omit, pick } from 'lodash-es'
import { uid } from 'pro-composables'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../composables'
import { proFieldProps as _proFieldProps, InternalValueTypeEnum, ProField } from '../form'
import { AUTO_CREATE_ID } from '../form-list'
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

    function addRowIdToRow(val: any) {
      const { postValue } = overridedProps.value
      if (!isArray(val)) {
        return postValue ? postValue(val) : []
      }
      const normalizedVals = val.map((item) => {
        return item[AUTO_CREATE_ID]
          ? item
          : { ...item, [AUTO_CREATE_ID]: uid() }
      })
      return postValue
        ? postValue(normalizedVals)
        : normalizedVals
    }

    expose(exposed)
    return {
      addRowIdToRow,
      proFieldProps,
      fieldDataTableProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.proFieldProps}
        isList={true}
        postValue={this.addRowIdToRow}
        fieldProps={this.fieldDataTableProps}
        valueType={InternalValueTypeEnum.EDIT_DATA_TABLE}
      >
        {{
          input: (pureProps: any) => {
            return <EditDataTable {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
