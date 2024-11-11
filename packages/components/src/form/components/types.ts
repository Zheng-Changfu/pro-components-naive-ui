import type { IfAny, Merge, Paths } from 'type-fest'
import type { VNodeChild } from 'vue'
import type { ProAutoCompleteProps, ProAutoCompleteSlots } from './auto-complete'
import type { ProCheckboxProps, ProCheckboxSlots } from './checkbox'

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
  valueType?: 'auto-complete'
  fieldSlots?: UnwrapSlots<ProAutoCompleteSlots>
  fieldProps?: MaybeFunction<NonNullable<ProAutoCompleteProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProAutoCompleteProps['fieldProps']>, ProFieldPropsParameters>
}

interface CheckboxColumn<
  Values = any,
  FieldPropsParameters extends any[] = any[],
  ProFieldPropsParameters extends any[] = any[],
> extends ProBaseFieldColumn<Values> {
  valueType?: 'checkbox'
  fieldSlots?: UnwrapSlots<ProCheckboxSlots>
  fieldProps?: MaybeFunction<NonNullable<ProCheckboxProps['fieldProps']>, FieldPropsParameters>
  proFieldProps?: MaybeFunction<NonNullable<ProCheckboxProps['fieldProps']>, ProFieldPropsParameters>
}

export type ProFieldColumn<
  Values = any,
  ExtraProps extends object = object,
  FunctionalFieldPropsParameters extends any[] = any[],
  FunctionalProFieldPropsParameters extends any[] = any[],
> =
  | Merge<CheckboxColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>
  | Merge<AutoCompleteColumn<Values, FunctionalFieldPropsParameters, FunctionalProFieldPropsParameters>, ExtraProps>

// const a: ProFieldColumn<{ a: string }, { xxx?: string }, [{ abc: string }, number]> = {
//   valueType: 'checkbox',
//   fieldProps: (a, index) => {
//     return {

//     }
//   },
//   fieldSlots: {
//     validation: ({ warnings }) => {

//     },
//   },
//   xxx: 's',
// }

// type C = ProBaseFieldColumn<{ a: 1, b: 2, c: { d: string }, e: [string, string] }>
