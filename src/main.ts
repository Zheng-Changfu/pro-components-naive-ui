import { createApp } from 'vue'
import naive from 'naive-ui'
import proComponents from 'pro-components-naive-ui'
import SiteRoot from './SiteRoot.vue'
import { installDemoComponents } from './setup'
import { routes } from './routes/routes'
import createDemoRouter from './routes/router'

const app = createApp(SiteRoot)
const router = createDemoRouter(app, routes)
app.use(naive)
app.use(proComponents)
app.use(router)
installDemoComponents(app)

router.isReady().then(() => {
  app.mount('#app')
})
