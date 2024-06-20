import type { App } from 'vue'

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
  function install(app: App): void {
    console.log(app, 'app', components)
    if (installTargets.includes(app))
      return
    installTargets.push(app)
    components.forEach((component) => {
      const { name, alias } = component
      registerComponent(app, name, component)
      if (alias) {
        alias.forEach((aliasName: string) => {
          registerComponent(app, aliasName, component)
        })
      }
    })
  }
  return {
    install,
  }
}
