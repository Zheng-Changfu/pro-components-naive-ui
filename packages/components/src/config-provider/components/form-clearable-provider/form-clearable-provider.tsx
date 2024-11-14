import { defineComponent } from 'vue'
import { ProConfigProvider } from '../../../config-provider'

const name = 'ProFormClearableProvider'
export default defineComponent({
  name,
  setup() {
    /**
     * 为了让用户自定义的组件也可以被该组件包裹
     */
    provide('pro-form-clearable', true)
    return {
      propOverrides: {
        ProDate: { fieldProps: { clearable: true } },
        ProRate: { fieldProps: { clearable: true } },
        ProTime: { fieldProps: { clearable: true } },
        ProInput: { fieldProps: { clearable: true } },
        ProDigit: { fieldProps: { clearable: true } },
        ProSelect: { fieldProps: { clearable: true } },
        ProCascader: { fieldProps: { clearable: true } },
        ProPassword: { fieldProps: { clearable: true } },
        ProTextarea: { fieldProps: { clearable: true } },
        ProDateTime: { fieldProps: { clearable: true } },
        ProDateYear: { fieldProps: { clearable: true } },
        ProDateWeek: { fieldProps: { clearable: true } },
        ProDateMonth: { fieldProps: { clearable: true } },
        ProDateRange: { fieldProps: { clearable: true } },
        ProTreeSelect: { fieldProps: { clearable: true } },
        ProDateQuarter: { fieldProps: { clearable: true } },
        ProAutoComplete: { fieldProps: { clearable: true } },
        ProDateYearRange: { fieldProps: { clearable: true } },
        ProDateTimeRange: { fieldProps: { clearable: true } },
        ProDateMonthRange: { fieldProps: { clearable: true } },
        ProDateQuarterRange: { fieldProps: { clearable: true } },
      },
    }
  },
  render() {
    return (
      <ProConfigProvider propOverrides={this.propOverrides}>
        {this.$slots.default?.()}
      </ProConfigProvider>
    )
  },
})
