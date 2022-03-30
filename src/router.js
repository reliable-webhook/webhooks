import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import qs from 'qs'

import HomePage from 'application/pages/Home'
import ProjectShow from 'projects/pages/Show'

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'home'
  },
  {
    path: '/projects/:uuid',
    component: ProjectShow,
    name: 'project'
  }
]

const router = createRouter({
  history: (process.env.ELECTRON || process.env.VSCODE) ? createWebHashHistory(process.env.BASE_PATH) : createWebHistory(process.env.BASE_PATH),
  parseQuery: qs.parse,
  stringifyQuery: qs.stringify,
  routes
})

export default router
