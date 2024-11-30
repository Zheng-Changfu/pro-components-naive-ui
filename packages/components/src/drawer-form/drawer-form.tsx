import type { DrawerProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProFormProps } from '../form'
import type { ProDrawerFormSlots } from './slots'
import { pick } from 'lodash-es'
import { drawerProps as _nDrawerProps, NDrawer } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/useClsPrefix'
import { useMountStyle } from '../_internal/useMountStyle'
import { useOverrideProps } from '../composables'
import { proFormProps as _proFormProps, ProForm } from '../form'
import { createProDrawerForm } from './composables/createProDrawerForm'
import { proDrawerFormProps } from './props'
import style from './styles/index.cssr'

const name = 'ProDrawerForm'
export default defineComponent({
  name,
  props: proDrawerFormProps,
  slots: Object as SlotsType<ProDrawerFormSlots>,
  setup(props) {
    let form = props.form
    if (!form && __DEV__) {
      form = createProDrawerForm()
    }

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const mergedClsPrefix = useNaiveClsPrefix()

    const proFormProps = computed<ProFormProps>(() => {
      return {
        ...pick(
          overridedProps.value,
          Object.keys(_proFormProps),
        ),
        form,
      }
    })

    const nDrawerProps = computed<DrawerProps>(() => {
      const {
        // #region 冲突的属性
        theme,
        themeOverrides,
        builtinThemeOverrides,
        // #endregion
        drawerProps,
        ...restProps
      } = overridedProps.value

      return {
        ...(drawerProps ?? {}),
        ...pick(
          restProps,
          Object.keys(_nDrawerProps),
        ),
        'show': form.show.value,
        'onUpdateShow': undefined,
        'onAfterLeave': onAfterLeave,
        'onUpdate:show': doUpdateShow,
      }
    })

    function doUpdateShow(val: boolean) {
      if (val) {
        form.open()
        return
      }
      if (
        form.submiting.value
        && !overridedProps.value.closeOnSubmiting
      ) {
        return
      }
      form.close()
    }

    function onAfterLeave() {
      const {
        onAfterLeave,
        restoreValuesOnClosed,
      } = overridedProps.value

      if (restoreValuesOnClosed) {
        form.restoreFieldsValue()
      }

      onAfterLeave && onAfterLeave()
    }

    useMountStyle(
      name,
      'pro-drawer-form',
      style,
      mergedClsPrefix,
    )

    return {
      proFormProps,
      nDrawerProps,
      mergedClsPrefix,
    }
  },
  render() {
    return (
      <NDrawer
        class={[
          `${this.mergedClsPrefix}-pro-drawer-form`,
        ]}
        {...this.nDrawerProps}
      >
        {{
          ...this.$slots,
          default: () => {
            return <ProForm {...this.proFormProps}>{this.$slots.default?.()}</ProForm>
          },
        }}
      </NDrawer>
    )
  },
})
