import { createApp } from 'vue'
import native from 'naive-ui'
import SiteRoot from './SiteRoot.vue'
import { installDemoComponents } from './setup'
import { routes } from './routes/routes'
import createDemoRouter from './routes/router'
// import ProUI from 'pro-components-naive-ui'

const app = createApp(SiteRoot)
const router = createDemoRouter(app, routes)
app.use(native)
// app.use(ProUI)
app.use(router)
installDemoComponents(app)

router.isReady().then(() => {
  app.mount('#app')
})
