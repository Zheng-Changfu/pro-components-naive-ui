import type { SlotsType } from 'vue'
import type { ProEditDataTableSlots } from './slots'
import { isArray, omit, pick } from 'lodash-es'
import { uid } from 'pro-components-hooks'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../composables'
import { proFieldProps as _proFieldProps, ProField, ValueTypeEnum } from '../form'
import { AUTO_CREATE_ID } from '../form-list'
import FieldDataTable from './fields/field-data-table'
import { proEditDataTableProps } from './props'

const name = 'ProEditDataTable'
export default defineComponent({
  name,
  props: proEditDataTableProps,
  slots: Object as SlotsType<ProEditDataTableSlots>,
  setup(props) {
    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const proFieldProps = computed(() => {
      return pick(overridedProps.value, Object.keys(_proFieldProps))
    })

    const fieldDataTableProps = computed(() => {
      return {
        ...omit(overridedProps.value, Object.keys(_proFieldProps)),
        ...overridedProps.value.fieldProps,
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
        valueType={ValueTypeEnum.EDIT_DATA_TABLE}
      >
        {{
          input: (pureProps: any) => {
            return <FieldDataTable {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
