import type { SlotsType } from 'vue'
import type { ProFormListSlots } from './slots'
import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/useClsPrefix'
import { useMountStyle } from '../_internal/useMountStyle'
import { useOverrideProps } from '../composables'
import { ProField } from '../form/components'
import FormList from './components/form-list'
import { provideFormListInstStore } from './inst'
import { proFormListProps } from './props'
import style from './styles/index.cssr'

const name = 'ProFormList'
export default defineComponent({
  name,
  props: proFormListProps,
  slots: Object as SlotsType<ProFormListSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideFormListInstStore()

    const mergedClsPrefix = useNaiveClsPrefix()

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
      name,
      'pro-form-list',
      style,
    )

    expose(exposed)
    return {
      splitProps,
      mergedClsPrefix,
    }
  },
  render() {
    const { mergedClsPrefix } = this

    return (
      <ProField
        {...this.splitProps.proFieldProps}
        isList={true}
        valueModelName=""
        class={[`${mergedClsPrefix}-pro-form-list`]}
        fieldProps={this.splitProps.fieldListProps}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return (
              <FormList
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
