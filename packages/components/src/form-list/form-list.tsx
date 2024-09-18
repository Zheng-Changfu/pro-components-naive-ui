import type { SlotsType } from 'vue'
import type { ProFormListSlots } from './slots'
import { isArray } from 'lodash-es'
import { uid } from 'pro-components-hooks'
import { computed } from 'vue'
import { useMountStyle } from '../_internal/useMountStyle'
import { useOverrideProps } from '../composables'
import { ProField, ValueTypeEnum } from '../form/components'
import { AUTO_CREATE_ID } from './context'
import FieldList from './fields/field-list'
import { useProFormListInst } from './inst'
import { proFormListProps } from './props'
import style from './styles/index.cssr'

const name = 'ProFormList'
export default defineComponent({
  name: 'ProFormList',
  props: proFormListProps,
  slots: Object as SlotsType<ProFormListSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProFormListInst()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const separateProps = computed(() => {
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
      const { postState } = overridedProps.value
      if (!isArray(val)) {
        return postState ? postState(val) : []
      }
      const normalizedVals = val.map((item) => {
        return item[AUTO_CREATE_ID]
          ? item
          : { ...item, [AUTO_CREATE_ID]: uid() }
      })
      return postState
        ? postState(normalizedVals)
        : normalizedVals
    }

    expose(methods)
    return {
      instRef,
      separateProps,
      autoCreateRowId,
    }
  },
  render() {
    return (
      <ProField
        ref="instRef"
        class="n-pro-form-item"
        {...this.separateProps.proFieldProps}
        isList={true}
        postState={this.autoCreateRowId}
        fieldProps={this.separateProps.fieldListProps}
        valueType={ValueTypeEnum.FORM_LIST}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <FieldList {...pureProps} v-slots={this.$slots}></FieldList>,
          ],
        }}
      </ProField>
    )
  },
})
