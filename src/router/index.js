import Vue from 'vue'
import Router from 'vue-router'
import Head from 'vue-head'
import Home from '@/views/Home'
import Select from '@/views/Select'
import Level from '@/views/Level'
import GameOver from '@/views/GameOver'
import Leaderboard from '@/views/Leaderboard'

Vue.use(Router)

/* If you don't know about VueHead, please refer to https://github.com/ktquez/vue-head */

Vue.use(Head, {
  complement: 'Calcurush'
})

/* If you don't know about VueRouter, please refer to https://router.vuejs.org/ */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/select',
      name: 'select',
      component: Select
    },
    {
      path: '/level-:level',
      name: 'level',
      component: Level
    },
    {
      path: '/gameover',
      name: 'gameover',
      component: GameOver
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Leaderboard
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})

export default router
