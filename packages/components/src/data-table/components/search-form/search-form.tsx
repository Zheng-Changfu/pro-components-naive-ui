import type { SlotsType } from 'vue'
import type { ProSearchFormInst } from './inst'
import type { ProSearchFormSlots } from './slots'
import { DownOutlined, UpOutlined } from '@vicons/antd'
import { NFlex, NGi, NGrid, NIcon } from 'naive-ui'
import { defineComponent } from 'vue'
import { resolveSlotWithProps } from '../../../_utils/resolve-slot'
import { ProButton, type ProButtonProps } from '../../../button'
import { useOverrideProps } from '../../../composables'
import { ProForm } from '../../../form'
import { ProFormClearableProvider } from '../../../form/components/clearable-provider'
import { useLocale } from '../../../locales'
import { useGridCollapsed } from './composables/useGridCollapsed'
import { useGridForm } from './composables/useGridForm'
import GridFieldItem from './grid-field-item'
import { proSearchFormProps } from './props'

const name = 'ProSearchForm'
export default defineComponent({
  name,
  props: proSearchFormProps,
  slots: Object as SlotsType<ProSearchFormSlots>,
  setup(props, { expose }) {
    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const {
      collapsed,
      nGridProps,
      toggleCollapsed,
    } = useGridCollapsed(overridedProps)

    const {
      reset,
      search,
      formMethods,
      proFormProps,
    } = useGridForm(overridedProps)

    const {
      getMessage,
    } = useLocale('ProSearchForm')

    const resetButtonProps = computed<ProButtonProps | false>(() => {
      const { resetButtonProps } = overridedProps.value
      return resetButtonProps === false
        ? false
        : {
            content: getMessage('reset'),
            ...(resetButtonProps ?? {}),
            onClick: reset,
          }
    })

    const searchButtonProps = computed<ProButtonProps | false>(() => {
      const { searchButtonProps } = overridedProps.value
      return searchButtonProps === false
        ? false
        : {
            type: 'primary',
            content: getMessage('search'),
            ...(searchButtonProps ?? {}),
            attrType: 'submit',
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
            content: getMessage('collapse')(collapsed.value),
            renderIcon: () => {
              return (
                <NIcon size={14}>
                  {collapsed.value ? <DownOutlined /> : <UpOutlined />}
                </NIcon>
              )
            },
            ...(collapseButtonProps ?? {}),
            onClick: toggleCollapsed,
          }
    })

    const exposed: ProSearchFormInst = {
      ...formMethods,
      reset,
      search,
      toggleCollapsed,
    }

    expose(exposed)
    return {
      reset,
      search,
      collapsed,
      nGridProps,
      proFormProps,
      toggleCollapsed,
      resetButtonProps,
      searchButtonProps,
      collapseButtonProps,
    }
  },

  render() {
    const {
      columns,
      nGridProps,
      proFormProps,
      showSuffixGridItem,
    } = this

    const resolvedColumns = toValue(columns) ?? []

    return (
      <ProFormClearableProvider>
        <ProForm {...proFormProps}>
          <NGrid {...nGridProps}>
            {{
              default: () => [
                resolvedColumns.map(column => <GridFieldItem column={column} />),
                showSuffixGridItem && (
                  <NGi suffix={true}>
                    {
                      resolveSlotWithProps(this.$slots.suffix, {
                        reset: this.reset,
                        search: this.search,
                        toggle: this.toggleCollapsed,
                        collapsed: this.collapsed,
                      }, () => [
                        <NFlex justify="end">
                          {this.searchButtonProps !== false && <ProButton {...this.searchButtonProps} />}
                          {this.resetButtonProps !== false && <ProButton {...this.resetButtonProps} />}
                          {this.collapseButtonProps !== false && <ProButton {...this.collapseButtonProps} />}
                        </NFlex>,
                      ])
                    }
                  </NGi>
                ),
              ],
            }}
          </NGrid>
        </ProForm>
      </ProFormClearableProvider>
    )
  },
})
