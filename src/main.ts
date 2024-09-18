import naive from 'naive-ui'
import proComponents from 'pro-components-naive-ui'
import { createApp } from 'vue'
import createDemoRouter from './routes/router'
import { routes } from './routes/routes'
import { installDemoComponents } from './setup'
import SiteRoot from './SiteRoot.vue'
import 'virtual:uno.css'

const app = createApp(SiteRoot)
const router = createDemoRouter(app, routes)
app.use(naive)
app.use(proComponents)
app.use(router)
installDemoComponents(app)

router.isReady().then(() => {
  app.mount('#app')
})
