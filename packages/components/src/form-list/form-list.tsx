import type { SlotsType } from 'vue'
import type { ProFormListSlots } from './slots'
import { isArray } from 'lodash-es'
import { uid } from 'pro-components-hooks'
import { computed } from 'vue'
import { useMountStyle } from '../_internal/useMountStyle'
import { useOverrideProps } from '../composables'
import { ProField, ValueTypeEnum } from '../form/components'
import { AUTO_CREATE_ID } from './context'
import FormList from './fields/form-list'
import { provideFormListInstStore } from './inst'
import { proFormListProps } from './props'
import style from './styles/index.cssr'

const name = 'ProFormList'
export default defineComponent({
  name: 'ProFormList',
  props: proFormListProps,
  slots: Object as SlotsType<ProFormListSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideFormListInstStore()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const splitProps = computed(() => {
      const {
        min,
        max,
        position,
        actionGuard,
        copyButtonProps,
        removeButtonProps,
        creatorButtonProps,
        creatorInitialValue,
        onlyShowFirstItemLabel,
        ...proFieldProps
      } = overridedProps.value

      return {
        proFieldProps,
        fieldListProps: {
          min,
          max,
          position,
          actionGuard,
          copyButtonProps,
          removeButtonProps,
          creatorButtonProps,
          creatorInitialValue,
          onlyShowFirstItemLabel,
        },
      }
    })

    useMountStyle(
      'ProFormItem',
      'pro-form-item',
      style,
    )

    function autoCreateRowId(val: any) {
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
      splitProps,
      autoCreateRowId,
    }
  },
  render() {
    return (
      <ProField
        class="n-pro-form-item"
        {...this.splitProps.proFieldProps}
        isList={true}
        postValue={this.autoCreateRowId}
        valueType={ValueTypeEnum.FORM_LIST}
        fieldProps={this.splitProps.fieldListProps}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <FormList {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
