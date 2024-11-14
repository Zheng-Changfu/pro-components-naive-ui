import type { Component } from 'vue'
import type { ProFieldColumnValueType } from '../form'
import type { ProDescriptionColumn } from './types'
import { InfoCircleOutlined } from '@vicons/antd'
import { isFunction } from 'lodash-es'
import { NDescriptionsItem, NIcon } from 'naive-ui'
import ProTooltip from '../_internal/components/pro-tooltip'

function genProFieldComponent({
  column,
  dataSource,
  valueTypeMap,
}: Omit<ConvertProColumnToDescriptionsItemOptions, '$slots'>) {
  if (column.render) {
    return column.render(dataSource)
  }
  const Component = valueTypeMap[column.valueType ?? 'input']
  if (Component) {
    const {
      path,
      fieldSlots,
      fieldProps,
      proFieldProps,
    } = column

    const resolvedFieldProps = isFunction(fieldProps) ? fieldProps(dataSource) : (fieldProps ?? {})
    const resolvedProFieldProps = isFunction(proFieldProps) ? proFieldProps(dataSource) : (proFieldProps ?? {})

    return h(Component, {
      simple: true,
      readonly: true,
      ...resolvedProFieldProps,
      path,
      fieldProps: resolvedFieldProps,
    }, fieldSlots)
  }
}

function genDescriptionsItemLabel(column: ProDescriptionColumn) {
  const title = column.title ?? column.label
  if (title) {
    const resolvedTitle = isFunction(title) ? title() : title
    return [
      resolvedTitle,
      <ProTooltip
        trigger="hover"
        tooltip={column.tooltip}
      >
        {{
          trigger: () => {
            return (
              <NIcon
                size={16}
                style={{
                  cursor: 'pointer',
                  verticalAlign: 'text-bottom',
                  marginInlineStart: '4px',
                }}
              >
                <InfoCircleOutlined />
              </NIcon>
            )
          },
        }}
      </ProTooltip>,
    ]
  }
}

interface ConvertProColumnToDescriptionsItemOptions {
  $slots: any
  column: ProDescriptionColumn
  dataSource: Record<string, any>
  valueTypeMap: Partial<Record<ProFieldColumnValueType, Component>>
}
export function convertProColumnToDescriptionsItem({
  $slots,
  column,
  dataSource,
  valueTypeMap,
}: ConvertProColumnToDescriptionsItemOptions) {
  return (
    <NDescriptionsItem
      span={column.span}
      labelClass={column.labelClass}
      labelStyle={column.labelStyle}
      contentStyle={column.contentStyle}
      contentClass={column.contentClass}
    >
      {{
        ...$slots,
        label: () => genDescriptionsItemLabel(column),
        default: () => genProFieldComponent({ column, dataSource, valueTypeMap }),
      }}
    </NDescriptionsItem>
  )
}
