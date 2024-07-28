import type { InputInst } from 'naive-ui'
import type { PickFunction } from '../../../types'
import { createProComponentInstanceFactory } from '../../../hooks'

export type ProInputInst = PickFunction<InputInst>
export type ProPasswordInst = ProInputInst
export type ProTextareaInst = ProInputInst
export const useProInputInst = createProComponentInstanceFactory<ProInputInst>('ProInput')
export const useProPasswordInst = createProComponentInstanceFactory<ProPasswordInst>('ProPassword')
export const useProTextareaInst = createProComponentInstanceFactory<ProInputInst>('ProTextareaInst')
