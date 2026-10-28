import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '🌟 萌娃智慧成长乐园 - 幼小衔接与快乐启蒙首页' }
    },
    {
      path: '/pinyin',
      name: 'pinyin',
      component: () => import('../views/PinyinView.vue'),
      meta: { title: '🔤 汉语拼音启蒙乐园 - 四线三格与趣味闯关' }
    },
    {
      path: '/english',
      name: 'english',
      component: () => import('../views/EnglishView.vue'),
      meta: { title: '🌈 英语启蒙乐园 - 字母单词与亲子情景对话剧场' }
    },
    {
      path: '/voice-studio',
      name: 'voice-studio',
      component: () => import('../views/VoiceStudioView.vue'),
      meta: { title: '🎙️ 亲子配音工坊 - 全程用自己的声音学习' }
    },
    {
      path: '/big99',
      name: 'big99',
      component: () => import('../views/Big99View.vue'),
      meta: { title: '🎠 大九九乘法口诀表 - 趣味闯关乐园' }
    },
    {
      path: '/poetry',
      name: 'poetry-list',
      component: () => import('../views/PoetryListView.vue'),
      meta: { title: '📜 中小学必背古诗词宝库 - 趣味国学馆' }
    },
    {
      path: '/poetry/:id',
      name: 'poetry-detail',
      component: () => import('../views/PoetryDetailView.vue'),
      meta: { title: '🎨 古诗词沉浸学习与互动闯关' }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
