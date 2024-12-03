import type { PropType } from 'vue'
import type { ProCopyableTextConfig } from './types'
import { CheckOutlined, CopyOutlined } from '@vicons/antd'
import { useClipboard } from '@vueuse/core'
import { isString, toString } from 'lodash-es'
import { NButton, NIcon, NTooltip } from 'naive-ui'
import { defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../../_internal/useClsPrefix'
import { useMountStyle } from '../../_internal/useMountStyle'
import { useOverrideProps } from '../../composables'
import { useLocale } from '../../locales'
import { usePlainComponentConfig } from '../composables'
import style from './styles/index.cssr'

const name = 'ProCopyableText'
export const ProCopyableText = defineComponent({
  name,
  props: {
    /**
     * 复制的文本
     */
    value: undefined as unknown as PropType<any>,
    /**
     * 传递给 useClipboard 的选项
     */
    config: Object as PropType<ProCopyableTextConfig>,
  },
  setup(props) {
    const mergedClsPrefix = useNaiveClsPrefix()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const {
      getMessage,
    } = useLocale(name)

    const {
      empty,
      emptyText,
      mergedValue,
    } = usePlainComponentConfig('copyableText', overridedProps)

    const {
      copy,
      copied,
    } = useClipboard({ source: mergedValue, ...props.config })

    useMountStyle(
      name,
      'pro-copyable-text',
      style,
    )

    function copyText(e: MouseEvent) {
      e.stopPropagation()
      copy()
    }

    return {
      empty,
      copied,
      copyText,
      emptyText,
      getMessage,
      mergedValue,
      mergedClsPrefix,
    }
  },
  render() {
    if (this.empty) {
      return this.emptyText
    }
    return (
      <div class={[`${this.mergedClsPrefix}-pro-copyable-text`]}>
        {this.mergedValue}
        <NTooltip trigger="hover">
          {{
            trigger: () => (
              <NButton
                text={true}
                type="primary"
                class={[`${this.mergedClsPrefix}-pro-copyable-text__button`]}
                onClick={this.copyText}
              >
                <NIcon>
                  {this.copied ? <CheckOutlined /> : <CopyOutlined />}
                </NIcon>
              </NButton>
            ),
            default: () => {
              const text = this.copied ? 'copied' : 'copy'
              return this.getMessage(text)
            },
          }}
        </NTooltip>
      </div>
    )
  },

})

export function renderCopyableText(value: any, config?: ProCopyableTextConfig) {
  return (
    <ProCopyableText
      value={value}
      config={config}
    />
  )
}

export function transformValueToString(value: any) {
  return isString(value) ? value : toString(value)
}
