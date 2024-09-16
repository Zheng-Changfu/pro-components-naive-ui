import type { ProCardSlots } from '../card'

interface DialogSlots {
  icon?: any
  close?: any
  action?: any
  default?: any
  header?: any
}
export type ProModalSlots = Omit<ProCardSlots, 'collaspe'> & DialogSlots
