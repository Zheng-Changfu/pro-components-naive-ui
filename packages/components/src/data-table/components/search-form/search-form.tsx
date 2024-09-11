import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import { NFlex, NGi, NGrid, NIcon } from 'naive-ui'
import { DownOutlined, UpOutlined } from '@vicons/antd'
import { ProForm } from '../../../form'
import { useInjectGlobalConfig } from '../../../config-provider'
import { useLocale } from '../../../locales'
import { ProButton, type ProButtonProps } from '../../../button'
import { proSearchFormProps } from './props'
import type { ProSearchFormSlots } from './slots'
import type { ProSearchFormColumn } from './types'
import { useGridCollapsed } from './composables/useGridCollapsed'
import { useGridForm } from './composables/useGridForm'
import type { ProSearchFormInst } from './inst'

export default defineComponent({
  name: 'ProSearchForm',
  props: proSearchFormProps,
  slots: Object as SlotsType<ProSearchFormSlots>,
  setup(props, { expose }) {
    const {
      collapsed,
      nGridProps,
      toggleCollapsed,
    } = useGridCollapsed(props)

    const {
      reset,
      search,
      formMethods,
      proFormProps,
      getColumnVisible,
    } = useGridForm(props)

    const {
      getMessage,
    } = useLocale('ProSearchForm')

    const {
      valueTypeMap,
    } = useInjectGlobalConfig()

    const resetButtonProps = computed<ProButtonProps | false>(() => {
      const { resetButtonProps } = props
      return resetButtonProps === false
        ? false
        : {
            content: getMessage('resetText'),
            ...(resetButtonProps ?? {}),
            onClick: reset,
          }
    })

    const searchButtonProps = computed<ProButtonProps | false>(() => {
      const { searchButtonProps } = props
      return searchButtonProps === false
        ? false
        : {
            type: 'primary',
            content: getMessage('searchText'),
            ...(searchButtonProps ?? {}),
            attrType: 'submit',
          }
    })

    const collapseButtonProps = computed<ProButtonProps | false>(() => {
      const { collapseButtonProps } = props
      return collapseButtonProps === false
        ? false
        : {
            text: true,
            type: 'primary',
            iconPlacement: 'right',
            content: getMessage('collapseText')(collapsed.value),
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
      reset,
      search,
      toggleCollapsed,
      submit: formMethods.submit,
      getScope: formMethods.getScope,
      validate: formMethods.validate,
      matchPath: formMethods.matchPath,
      getFieldValue: formMethods.getFieldValue,
      setFieldValue: formMethods.setFieldValue,
      getFieldsValue: formMethods.getFieldsValue,
      setFieldsValue: formMethods.setFieldsValue,
      resetFieldValue: formMethods.resetFieldValue,
      setInitialValue: formMethods.setInitialValue,
      setInitialValues: formMethods.setInitialValues,
      resetFieldsValue: formMethods.resetFieldsValue,
      restoreValidation: formMethods.restoreValidation,
      restoreFieldValue: formMethods.restoreFieldValue,
      restoreFieldsValue: formMethods.restoreFieldsValue,
      getFieldValidateResult: formMethods.getFieldValidateResult,
      pauseDependenciesTrigger: formMethods.pauseDependenciesTrigger,
      getFieldsTransformedValue: formMethods.getFieldsTransformedValue,
      resumeDependenciesTrigger: formMethods.resumeDependenciesTrigger,
    }

    expose(exposed)
    return {
      reset,
      search,
      collapsed,
      nGridProps,
      proFormProps,
      valueTypeMap,
      toggleCollapsed,
      getColumnVisible,
      resetButtonProps,
      searchButtonProps,
      collapseButtonProps,
    }
  },

  render() {
    const {
      columns,
      nGridProps,
      valueTypeMap,
      proFormProps,
      getColumnVisible,
      showSuffixGridItem,
    } = this

    function resolveColumn(column: ProSearchFormColumn) {
      if (column.render) {
        return column.render()
      }

      const {
        slots,
        render,
        valueType = 'input',
        ...restProps
      } = column

      const Comp = valueTypeMap[valueType]
      return Comp ? h(Comp, restProps, slots) : null
    }

    return (
      <ProForm {...proFormProps}>
        <NGrid {...nGridProps}>
          {
          (columns ?? []).map((column) => {
            const show = getColumnVisible(column)
            const { span, offset, ...restProps } = column
            return (
              <NGi v-show={show} span={span} offset={offset}>
                {resolveColumn(restProps)}
              </NGi>
            )
          })
          }
          {showSuffixGridItem && (
            <NGi suffix={true}>
              {
                this.$slots.suffix
                  ? this.$slots.suffix({
                    reset: this.reset,
                    search: this.search,
                    toggle: this.toggleCollapsed,
                    collapsed: this.collapsed,
                  })
                  : (
                    <NFlex justify="end">
                      {this.searchButtonProps !== false && <ProButton {...this.searchButtonProps} />}
                      {this.resetButtonProps !== false && <ProButton {...this.resetButtonProps} />}
                      {this.collapseButtonProps !== false && <ProButton {...this.collapseButtonProps} />}
                    </NFlex>
                    )
              }
            </NGi>
          )}
        </NGrid>
      </ProForm>
    )
  },
})
