/* eslint-disable perfectionist/sort-imports */
import { createApp } from 'vue'
import { create, NA, NAlert, NAnchor, NAnchorLink, NBlockquote, NCard, NCode, NH1, NH2, NH3, NLi, NP, NScrollbar, NTable, NTabPane, NTabs, NText, NUl } from 'naive-ui'
import proComponents from 'pro-naive-ui'
import createDemoRouter from './routes/router'
import { routes } from './routes/routes'
import { installDemoComponents } from './setup'
import SiteRoot from './SiteRoot.vue'
import 'virtual:uno.css'

const app = createApp(SiteRoot)
const router = createDemoRouter(app, routes)
app.use(create({
  components: [
    NA,
    NP,
    NLi,
    NH1,
    NH2,
    NUl,
    NH3,
    NCode,
    NText,
    NCard,
    NTable,
    NAnchor,
    NScrollbar,
    NAnchorLink,
    NAlert,
    NTabs,
    NTabPane,
    NBlockquote,
  ],
}))
app.use(proComponents)
app.use(router)
installDemoComponents(app)

router.isReady().then(() => {
  app.mount('#app')
})
