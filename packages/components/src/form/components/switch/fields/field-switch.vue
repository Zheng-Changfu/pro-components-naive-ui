<script lang='tsx'>
import { NSwitch, switchProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { ProSwitchSlots } from '../slots'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'FieldSwitch',
  props: switchProps,
  slots: Object as SlotsType<ProSwitchSlots>,
  setup() {
    const {
      empty,
      value,
      readonly,
      emptyText,
      readonlyRender,
    } = useReadonlyHelpers()

    return {
      empty,
      value,
      readonly,
      emptyText,
      readonlyRender,
    }
  },
  render() {
    const {
      $props,
      $slots,
      empty,
      value,
      readonly,
      emptyText,
      readonlyRender,
    } = this

    if (readonly) {
      if (readonlyRender) {
        return readonlyRender()
      }
      if (empty) {
        return emptyText
      }
      return value
        ? ($slots.checked?.() ?? '打开')
        : ($slots.unchecked?.() ?? '关闭')
    }

    return (
      <NSwitch
        {...$props}
        v-slots={$slots}
      />
    )
  },
})
</script>
