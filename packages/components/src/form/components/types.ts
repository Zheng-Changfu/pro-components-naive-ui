import type { IfAny, Merge, Paths } from 'type-fest'
import type { VNodeChild } from 'vue'
import type { ProAutoCompleteProps, ProAutoCompleteSlots } from './auto-complete'
import type { ProCascaderProps, ProCascaderSlots } from './cascader'
import type { ProCheckboxProps, ProCheckboxSlots } from './checkbox'
import type { ProCheckboxGroupProps, ProCheckboxGroupSlots } from './checkbox-group'
import type { ProColorPickerProps, ProColorPickerSlots } from './color-picker'
import type { ProDatePickerProps, ProDatePickerSlots } from './date-picker'
import type { ProDigitProps, ProDigitSlots } from './digit'
import type { ProDynamicTagsProps, ProDynamicTagsSlots } from './dynamic-tags'
import type { ProFieldProps, ValueTypeEnum } from './field'
import type { ProInputProps, ProInputSlots } from './input'
import type { ProMentionProps, ProMentionSlots } from './mention'
import type { ProRadioGroupProps, ProRadioGroupSlots } from './radio-group'
import type { ProRateProps, ProRateSlots } from './rate'
import type { ProSelectProps, ProSelectSlots } from './select'
import type { ProSliderProps, ProSliderSlots } from './slider'
import type { ProSwitchProps, ProSwitchSlots } from './switch'
import type { ProTimePickerProps, ProTimePickerSlots } from './time-picker'
import type { ProTransferProps, ProTransferSlots } from './transfer'
import type { ProTreeSelectProps, ProTreeSelectSlots } from './tree-select'
import type { ProUploadProps, ProUploadSlots } from './upload'

type UnwrapSlots<T> = {
  [K in keyof T]: IfAny<T[K]> extends true ? () => VNodeChild : (params: NonNullable<T[K]>) => VNodeChild
}

type MaybeFunction<T, Parameters extends any[]> = T | ((...args: Parameters) => T)

export type InternalProFieldProps = Omit<
  ProFieldProps,
  | 'path'
  | 'isList'
  | 'valueType'
  | 'fieldProps'
  | 'defaultValue'
  | 'valueModelName'
>

interface ProBaseFieldColumn<Values = any, ProFieldPropsParameters extends any[] = any[]> {
  /**
   * 字段路径
   */
  path?: Paths<Values>
  /**
   * 透传给 ProField 组件的 props
   */
  proFieldProps?: MaybeFunction<InternalProFieldProps, ProFieldPropsParameters>
}

interface AutoCompleteColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.AUTO_COMPLETE}`
  fieldSlots?: UnwrapSlots<ProAutoCompleteSlots>
  fieldProps?: MaybeFunction<NonNullable<ProAutoCompleteProps['fieldProps']>, FieldPropsParameters>
}

interface CheckboxColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.CHECKBOX}`
  fieldSlots?: UnwrapSlots<ProCheckboxSlots>
  fieldProps?: MaybeFunction<NonNullable<ProCheckboxProps['fieldProps']>, FieldPropsParameters>
}

interface CascaderColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.CASCADER}`
  fieldSlots?: UnwrapSlots<ProCascaderSlots>
  fieldProps?: MaybeFunction<NonNullable<ProCascaderProps['fieldProps']>, FieldPropsParameters>
}

interface CheckboxGroupColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.CHECKBOX_GROUP}`
  fieldSlots?: UnwrapSlots<ProCheckboxGroupSlots>
  fieldProps?: MaybeFunction<NonNullable<ProCheckboxGroupProps['fieldProps']>, FieldPropsParameters>
}

interface ColorPickerColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.COLOR_PICKER}`
  fieldSlots?: UnwrapSlots<ProColorPickerSlots>
  fieldProps?: MaybeFunction<NonNullable<ProColorPickerProps['fieldProps']>, FieldPropsParameters>
}

interface DigitColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.DIGIT}`
  fieldSlots?: UnwrapSlots<ProDigitSlots>
  fieldProps?: MaybeFunction<NonNullable<ProDigitProps['fieldProps']>, FieldPropsParameters>
}

interface DynamicTagsColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.DYNAMIC_TAGS}`
  fieldSlots?: UnwrapSlots<ProDynamicTagsSlots>
  fieldProps?: MaybeFunction<NonNullable<ProDynamicTagsProps['fieldProps']>, FieldPropsParameters>
}

interface InputColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.INPUT}`
  fieldSlots?: UnwrapSlots<ProInputSlots>
  fieldProps?: MaybeFunction<NonNullable<ProInputProps['fieldProps']>, FieldPropsParameters>
}

interface MentionColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.MENTION}`
  fieldSlots?: UnwrapSlots<ProMentionSlots>
  fieldProps?: MaybeFunction<NonNullable<ProMentionProps['fieldProps']>, FieldPropsParameters>
}

interface RadioGroupColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.RADIO_GROUP}`
  fieldSlots?: UnwrapSlots<ProRadioGroupSlots>
  fieldProps?: MaybeFunction<NonNullable<ProRadioGroupProps['fieldProps']>, FieldPropsParameters>
}

interface RateColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.RATE}`
  fieldSlots?: UnwrapSlots<ProRateSlots>
  fieldProps?: MaybeFunction<NonNullable<ProRateProps['fieldProps']>, FieldPropsParameters>
}

interface SelectColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.SELECT}`
  fieldSlots?: UnwrapSlots<ProSelectSlots>
  fieldProps?: MaybeFunction<NonNullable<ProSelectProps['fieldProps']>, FieldPropsParameters>
}

interface SliderColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.SLIDER}`
  fieldSlots?: UnwrapSlots<ProSliderSlots>
  fieldProps?: MaybeFunction<NonNullable<ProSliderProps['fieldProps']>, FieldPropsParameters>
}

interface SwitchColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.SWITCH}`
  fieldSlots?: UnwrapSlots<ProSwitchSlots>
  fieldProps?: MaybeFunction<NonNullable<ProSwitchProps['fieldProps']>, FieldPropsParameters>
}

interface TimePickerColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.TIME}`
  fieldSlots?: UnwrapSlots<ProTimePickerSlots>
  fieldProps?: MaybeFunction<NonNullable<ProTimePickerProps['fieldProps']>, FieldPropsParameters>
}

interface TransferColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.TRANSFER}`
  fieldSlots?: UnwrapSlots<ProTransferSlots>
  fieldProps?: MaybeFunction<NonNullable<ProTransferProps['fieldProps']>, FieldPropsParameters>
}

interface UploadColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.UPLOAD}`
  fieldSlots?: UnwrapSlots<ProUploadSlots>
  fieldProps?: MaybeFunction<NonNullable<ProUploadProps['fieldProps']>, FieldPropsParameters>
}

interface DatePickerColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?:
    | `${ValueTypeEnum.DATE}`
    | `${ValueTypeEnum.DATE_TIME}`
    | `${ValueTypeEnum.DATE_WEEK}`
    | `${ValueTypeEnum.DATE_MONTH}`
    | `${ValueTypeEnum.DATE_RANGE}`
    | `${ValueTypeEnum.DATE_RANGE}`
    | `${ValueTypeEnum.DATE_QUARTER}`
    | `${ValueTypeEnum.DATE_TIME_RANGE}`
    | `${ValueTypeEnum.DATE_YEAR_RANGE}`
    | `${ValueTypeEnum.DATE_MONTH_RANGE}`
    | `${ValueTypeEnum.DATE_QUARTER_RANGE}`
  fieldSlots?: UnwrapSlots<ProDatePickerSlots>
  fieldProps?: MaybeFunction<NonNullable<ProDatePickerProps['fieldProps']>, FieldPropsParameters>
}

interface TreeSelectColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values, ProFieldPropsParameters> {
  valueType?: `${ValueTypeEnum.TREE_SELECT}`
  fieldSlots?: UnwrapSlots<ProTreeSelectSlots>
  fieldProps?: MaybeFunction<NonNullable<ProTreeSelectProps['fieldProps']>, FieldPropsParameters>
}

/**
 * 通用字段解释
 *  valueType: 要根据哪个组件类型渲染值
 *  fieldProps: 透传给 valueType 组件的 props
 *  fieldSlots: 透传给 valueType 组件的 slots
 *  proFieldProps: 透传给 ProField 组件的 props (ProField 是一个中间层组件，管理值以及控制渲染，处理完后下发给 FormItem 以及表单项组件)
 */
export type ProFieldColumn<
  Values = any,
  ExtraProps extends object = object,
  FunctionalFieldPropsParameters extends any[] = any[],
  FunctionalProFieldPropsParameters extends any[] = any[],
> =
  | Merge<RateColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<DigitColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<InputColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<SelectColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<SliderColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<SwitchColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<UploadColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<MentionColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<CascaderColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<TransferColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<CheckboxColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<RadioGroupColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<TimePickerColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<DatePickerColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<TreeSelectColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<ColorPickerColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<DynamicTagsColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<AutoCompleteColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<CheckboxGroupColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
