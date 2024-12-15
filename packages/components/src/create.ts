import type { App } from 'vue'
import { isPlainObject } from 'lodash-es'

type ComponentType = any
export interface UiInstance {
  // version: string
  install: (app: App) => void
}

interface UiCreateOptions {
  components?: ComponentType[]
  componentPrefix?: string
}

export function create({
  components = [],
}: UiCreateOptions = {}): UiInstance {
  const installTargets: App[] = []
  function registerComponent(
    app: App,
    name: string,
    component: ComponentType,
  ): void {
    const registered = app.component(name)
    if (!registered)
      app.component(name, component)
  }

  function isComponent(component: ComponentType) {
    if (!isPlainObject(component)) {
      return false
    }
    const { name, setup } = component
    return name && setup
  }

  function install(app: App): void {
    if (installTargets.includes(app))
      return
    installTargets.push(app)
    components.forEach((component) => {
      if (isComponent(component)) {
        const { name } = component
        registerComponent(app, name, component)
      }
    })
  }
  return {
    install,
  }
}
