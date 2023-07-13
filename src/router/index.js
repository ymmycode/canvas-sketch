import { createRouter, createWebHistory } from 'vue-router'
import DrawBoard from '../views/DrawBoard.vue'
import MainMenu from '../views/MainMenu.vue'
import CanvasStream from '../views/CanvasStream.vue'

const routes = [
  {
    path: '/',
    name: 'main-menu',
    component: MainMenu
  },
  {
    path: '/drawboard',
    name: 'drawboard',
    component: DrawBoard
  },
  {
    path: '/canvas-stream',
    name: 'canvas-stream',
    component: CanvasStream
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router