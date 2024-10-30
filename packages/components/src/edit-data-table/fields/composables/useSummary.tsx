import type { SummaryRowData } from 'naive-ui/es/data-table/src/interface'
import type { FieldDataTableProps } from '../field-data-table'
import { isArray } from 'lodash-es'
import { ref, watchEffect } from 'vue'

// const CreatorButton = defineComponent({
//   name: 'CreatorButton',
//   props: {},
//   setup() {},
//   render() {
//     return 'button'
//   },
// })

export function useSummary(props: FieldDataTableProps) {
  const position = ref<'top' | 'bottom' | false>('bottom')

  function renderCreatorButton(): SummaryRowData {
    return {
      x: {
        // value: <CreatorButton {...props} />,
      },
    }
  }

  function renderSummary(pageData: any[]) {
    const summaryRows: SummaryRowData[] = []
    if (props.summary) {
      const summaryRowData = props.summary(pageData)
      isArray(summaryRowData)
        ? summaryRows.push(...summaryRowData)
        : summaryRows.push(summaryRowData)
    }

    const max = props.max ?? Number.POSITIVE_INFINITY
    if (position.value && pageData.length < max) {
      summaryRows.push(renderCreatorButton())
    }
    return summaryRows
  }

  watchEffect(() => {
    position.value = props.position ?? props.summaryPlacement ?? 'bottom'
  })

  return {
    position,
    summary: renderSummary,
    summaryPlacement: computed(() => position.value === false ? undefined : position.value),
  }
}
