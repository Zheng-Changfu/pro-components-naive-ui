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
import type { ValueTypeEnum } from './field'
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

interface ProBaseFieldColumn<Values = any> {
  /**
   * 字段路径
   */
  path?: Paths<Values>
}

type UnwrapSlots<T> = {
  [K in keyof T]: IfAny<T[K]> extends true ? () => VNodeChild : (params: NonNullable<T[K]>) => VNodeChild
}

type MaybeFunction<T, Parameters extends any[]> = T | ((...args: Parameters) => T)

interface AutoCompleteColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.AUTO_COMPLETE}`
  fieldSlots?: UnwrapSlots<ProAutoCompleteSlots>
  fieldProps?: MaybeFunction<NonNullable<ProAutoCompleteProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProAutoCompleteProps['fieldProps']>, ProFieldPropsParameters>
}

interface CheckboxColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.CHECKBOX}`
  fieldSlots?: UnwrapSlots<ProCheckboxSlots>
  fieldProps?: MaybeFunction<NonNullable<ProCheckboxProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProCheckboxProps['fieldProps']>, ProFieldPropsParameters>
}

interface CascaderColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.CASCADER}`
  fieldSlots?: UnwrapSlots<ProCascaderSlots>
  fieldProps?: MaybeFunction<NonNullable<ProCascaderProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProCascaderProps['fieldProps']>, ProFieldPropsParameters>
}

interface CheckboxGroupColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.CHECKBOX_GROUP}`
  fieldSlots?: UnwrapSlots<ProCheckboxGroupSlots>
  fieldProps?: MaybeFunction<NonNullable<ProCheckboxGroupProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProCheckboxGroupProps['fieldProps']>, ProFieldPropsParameters>
}

interface ColorPickerColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.COLOR_PICKER}`
  fieldSlots?: UnwrapSlots<ProColorPickerSlots>
  fieldProps?: MaybeFunction<NonNullable<ProColorPickerProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProColorPickerProps['fieldProps']>, ProFieldPropsParameters>
}

interface DigitColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.DIGIT}`
  fieldSlots?: UnwrapSlots<ProDigitSlots>
  fieldProps?: MaybeFunction<NonNullable<ProDigitProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProDigitProps['fieldProps']>, ProFieldPropsParameters>
}

interface DynamicTagsColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.DYNAMIC_TAGS}`
  fieldSlots?: UnwrapSlots<ProDynamicTagsSlots>
  fieldProps?: MaybeFunction<NonNullable<ProDynamicTagsProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProDynamicTagsProps['fieldProps']>, ProFieldPropsParameters>
}

interface InputColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.INPUT}`
  fieldSlots?: UnwrapSlots<ProInputSlots>
  fieldProps?: MaybeFunction<NonNullable<ProInputProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProInputProps['fieldProps']>, ProFieldPropsParameters>
}

interface MentionColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.MENTION}`
  fieldSlots?: UnwrapSlots<ProMentionSlots>
  fieldProps?: MaybeFunction<NonNullable<ProMentionProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProMentionProps['fieldProps']>, ProFieldPropsParameters>
}

interface RadioGroupColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.RADIO_GROUP}`
  fieldSlots?: UnwrapSlots<ProRadioGroupSlots>
  fieldProps?: MaybeFunction<NonNullable<ProRadioGroupProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProRadioGroupProps['fieldProps']>, ProFieldPropsParameters>
}

interface RateColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.RATE}`
  fieldSlots?: UnwrapSlots<ProRateSlots>
  fieldProps?: MaybeFunction<NonNullable<ProRateProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProRateProps['fieldProps']>, ProFieldPropsParameters>
}

interface SelectColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.SELECT}`
  fieldSlots?: UnwrapSlots<ProSelectSlots>
  fieldProps?: MaybeFunction<NonNullable<ProSelectProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProSelectProps['fieldProps']>, ProFieldPropsParameters>
}

interface SliderColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.SLIDER}`
  fieldSlots?: UnwrapSlots<ProSliderSlots>
  fieldProps?: MaybeFunction<NonNullable<ProSliderProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProSliderProps['fieldProps']>, ProFieldPropsParameters>
}

interface SwitchColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.SWITCH}`
  fieldSlots?: UnwrapSlots<ProSwitchSlots>
  fieldProps?: MaybeFunction<NonNullable<ProSwitchProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProSwitchProps['fieldProps']>, ProFieldPropsParameters>
}

interface TimePickerColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.TIME}`
  fieldSlots?: UnwrapSlots<ProTimePickerSlots>
  fieldProps?: MaybeFunction<NonNullable<ProTimePickerProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProTimePickerProps['fieldProps']>, ProFieldPropsParameters>
}

interface TransferColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.TRANSFER}`
  fieldSlots?: UnwrapSlots<ProTransferSlots>
  fieldProps?: MaybeFunction<NonNullable<ProTransferProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProTransferProps['fieldProps']>, ProFieldPropsParameters>
}

interface UploadColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.UPLOAD}`
  fieldSlots?: UnwrapSlots<ProUploadSlots>
  fieldProps?: MaybeFunction<NonNullable<ProUploadProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProUploadProps['fieldProps']>, ProFieldPropsParameters>
}

interface DatePickerColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
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
  proFieldProps?: MaybeFunction<NonNullable<ProDatePickerProps['fieldProps']>, ProFieldPropsParameters>
}

interface TreeSelectColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: `${ValueTypeEnum.TREE_SELECT}`
  fieldSlots?: UnwrapSlots<ProTreeSelectSlots>
  fieldProps?: MaybeFunction<NonNullable<ProTreeSelectProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProTreeSelectProps['fieldProps']>, ProFieldPropsParameters>
}

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
