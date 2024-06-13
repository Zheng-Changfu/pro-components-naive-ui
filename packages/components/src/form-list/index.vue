<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import { createArrayField, uid } from 'pro-components-hooks'
import { isArray } from 'lodash-es'
import type { ProComponentConfig } from '../form'
import { ProComponentConfigKey, ProFormItem, useGetProFieldProps } from '../form'
import { proFormListProps } from './props'
import type { ProFormListSlots } from './slots'
import type { ProFormListInstance } from './inst'
import { AUTO_CREATE_ID, provideProFormListInstanceContext } from './context'
import ProFormListItem from './FormListItem.vue'

export default defineComponent({
  name: 'ProFormList',
  props: proFormListProps,
  slots: Object as SlotsType<ProFormListSlots>,
  setup(props, { slots, expose }) {
    const proFieldProps = useGetProFieldProps(props)

    const field = createArrayField({
      ...proFieldProps,
      defaultValue: [],
      postState: autoCreateRowId,
    })

    function autoCreateRowId(val: any) {
      if (!isArray(val)) {
        return []
      }
      const { postState } = props
      const normalizedVals = val.map((item) => {
        return item[AUTO_CREATE_ID]
          ? item
          : { ...item, [AUTO_CREATE_ID]: uid() }
      })
      return postState
        ? postState(normalizedVals)
        : normalizedVals
    }

    const {
      stringPath,
      value: list,
      pop,
      move,
      push,
      shift,
      insert,
      remove,
      moveUp,
      unshift,
      moveDown,
    } = field

    /**
     * 注入自定义属性，在 pro-form-item 中完善 ProComponentConfig
     */
    field[ProComponentConfigKey] = {
      type: 'formList',
      ruleType: 'array',
      slots: computed(() => slots),
      empty: computed(() => list.value.length <= 0),
    } as Partial<ProComponentConfig>

    const exposed: ProFormListInstance = {
      pop,
      push,
      move,
      shift,
      insert,
      moveUp,
      remove,
      unshift,
      moveDown,
    }

    expose(exposed)
    provideProFormListInstanceContext(exposed)
    return {
      list,
      stringPath,
    }
  },
  render() {
    const {
      list,
      $props,
      $slots,
      stringPath,
    } = this

    return (
      <ProFormItem
        {...$props}
        path={stringPath}
        v-slots={{
          default: () => {
            return list.map((item, index) => {
              return (
                <ProFormListItem
                  index={index}
                  key={item[AUTO_CREATE_ID]}
                  v-slots={$slots}
                />
              )
            })
          },
        }}
      >
      </ProFormItem>
    )
  },
})
</script>
