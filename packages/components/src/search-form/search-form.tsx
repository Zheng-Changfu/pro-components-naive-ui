import type { GridProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProFormProps } from '../form'
import type { ProSearchFormSlots } from './slots'
import { gridProps as _nGridProps, NFormItem, NGi, NGrid } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/useClsPrefix'
import { useMountStyle } from '../_internal/useMountStyle'
import { keep } from '../_utils/keep'
import { keysOf } from '../_utils/keysOf'
import { resolveSlotWithProps } from '../_utils/resolveSlot'
import { useOverrideProps } from '../composables'
import { ProFormClearableProvider } from '../config-provider'
import { ProForm } from '../form'
import { proFormPropKeys } from '../form/props'
import GridFieldItem from './components/grid-field-item'
import Suffix from './components/suffix'
import { createProSearchForm } from './composables/createProSearchForm'
import { proSearchFormProps } from './props'
import style from './styles/index.cssr'

const name = 'ProSearchForm'
export default defineComponent({
  name,
  props: proSearchFormProps,
  inheritAttrs: false,
  slots: Object as SlotsType<ProSearchFormSlots>,
  setup(props) {
    let form = props.form
    if (!form && __DEV__) {
      form = createProSearchForm()
    }

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const mergedClsPrefix = useNaiveClsPrefix()

    const proFormProps = computed<ProFormProps>(() => {
      return keep(overridedProps.value, proFormPropKeys)
    })

    const nGridProps = computed<GridProps>(() => {
      const {
        // #region 冲突的属性
        // #endregion
        gridProps,
        ...restProps
      } = overridedProps.value
      return {
        ...(gridProps ?? {}),
        ...keep(restProps, keysOf(_nGridProps)),
        collapsed: form.collapsed.value,
      }
    })

    useMountStyle(
      name,
      'pro-search-form',
      style,
    )

    return {
      form,
      nGridProps,
      proFormProps,
      mergedClsPrefix,
      columns: computed(() => overridedProps.value.columns ?? []),
      resetButtonProps: computed(() => overridedProps.value.resetButtonProps),
      searchButtonProps: computed(() => overridedProps.value.searchButtonProps),
      showSuffixGridItem: computed(() => overridedProps.value.showSuffixGridItem),
      collapseButtonProps: computed(() => overridedProps.value.collapseButtonProps),
    }
  },

  render() {
    const {
      columns,
      nGridProps,
      proFormProps,
      mergedClsPrefix,
      showSuffixGridItem,
    } = this

    return (
      <ProFormClearableProvider>
        <ProForm
          {...this.$attrs}
          {...proFormProps}
          class={[`${mergedClsPrefix}-pro-search-form`]}
        >
          <NGrid {...nGridProps}>
            {(columns ?? []).map(column => <GridFieldItem column={column} />)}
            {showSuffixGridItem && (
              <NGi suffix={true}>
                {{
                  default: ({ overflow }: any) => {
                    const suffixDom = (
                      <Suffix
                        form={this.form}
                        resetButtonProps={this.resetButtonProps}
                        searchButtonProps={this.searchButtonProps}
                        collapseButtonProps={this.collapseButtonProps}
                      />
                    )
                    return (
                      <NFormItem class={[`${mergedClsPrefix}-pro-search-form__suffix`]}>
                        {resolveSlotWithProps(this.$slots.suffix, {
                          overflow,
                          suffixDom,
                        }, () => suffixDom)}
                      </NFormItem>
                    )
                  },
                }}
              </NGi>
            )}
          </NGrid>
        </ProForm>
      </ProFormClearableProvider>
    )
  },
})
