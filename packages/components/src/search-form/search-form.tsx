import type { GridProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProButtonProps } from '../button'
import type { ProFormProps } from '../form'
import type { ProSearchFormSlots } from './slots'
import { DownOutlined, UpOutlined } from '@vicons/antd'
import { gridProps as _nGridProps, NFlex, NGi, NGrid, NIcon } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { keep } from '../_utils/keep'
import { keysOf } from '../_utils/keysOf'
import { resolveSlotWithProps } from '../_utils/resolveSlot'
import { ProButton } from '../button'
import { useOverrideProps } from '../composables'
import { ProFormClearableProvider } from '../config-provider'
import { proFormProps as _proFormProps, ProForm } from '../form'
import { proFormPropKeys } from '../form/props'
import { useLocale } from '../locales'
import GridFieldItem from './components/grid-field-item'
import { createProSearchForm } from './composables/createProSearchForm'
import { proSearchFormProps } from './props'

const name = 'ProSearchForm'
export default defineComponent({
  name,
  props: proSearchFormProps,
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

    const {
      getMessage,
    } = useLocale('ProSearchForm')

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

    const resetButtonProps = computed<ProButtonProps | false>(() => {
      const { resetButtonProps } = overridedProps.value
      return resetButtonProps === false
        ? false
        : {
            attrType: 'reset',
            content: getMessage('reset'),
            disabled: form.submiting.value,
            ...(resetButtonProps ?? {}),
          }
    })

    const searchButtonProps = computed<ProButtonProps | false>(() => {
      const { searchButtonProps } = overridedProps.value
      return searchButtonProps === false
        ? false
        : {
            type: 'primary',
            attrType: 'submit',
            content: getMessage('search'),
            loading: form.submiting.value,
            ...(searchButtonProps ?? {}),
          }
    })

    const collapseButtonProps = computed<ProButtonProps | false>(() => {
      const { collapseButtonProps } = overridedProps.value
      return collapseButtonProps === false
        ? false
        : {
            text: true,
            type: 'primary',
            iconPlacement: 'right',
            disabled: form.submiting.value,
            content: getMessage('collapse')(form.collapsed.value),
            renderIcon: () => {
              return (
                <NIcon size={14}>
                  {form.collapsed.value ? <DownOutlined /> : <UpOutlined />}
                </NIcon>
              )
            },
            onClick: () => form.toggleCollapse(),
            ...(collapseButtonProps ?? {}),
          }
    })

    return {
      nGridProps,
      proFormProps,
      resetButtonProps,
      searchButtonProps,
      collapseButtonProps,
      columns: computed(() => overridedProps.value.columns ?? []),
      showSuffixGridItem: computed(() => overridedProps.value.showSuffixGridItem),
    }
  },

  render() {
    const {
      columns,
      nGridProps,
      proFormProps,
      showSuffixGridItem,
    } = this

    return (
      <ProFormClearableProvider>
        <ProForm {...proFormProps}>
          <NGrid {...nGridProps}>
            {(columns ?? []).map(column => <GridFieldItem column={column} />)}
            {showSuffixGridItem && (
              <NGi suffix={true}>
                {{
                  default: ({ overflow }: any) => {
                    return resolveSlotWithProps(this.$slots.suffix, {
                      overflow,
                    }, () => [
                      <NFlex justify="end">
                        {this.searchButtonProps !== false && <ProButton {...this.searchButtonProps} />}
                        {this.resetButtonProps !== false && <ProButton {...this.resetButtonProps} />}
                        {this.collapseButtonProps !== false && <ProButton {...this.collapseButtonProps} />}
                      </NFlex>,
                    ])
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
