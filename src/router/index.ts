import { createRouter, createWebHistory } from 'vue-router'
import MainView from "@/views/MainView.vue";
import LeaderBord from "@/views/LeaderBord.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView
    },
    {
      path: '/leaderBord',
      name: '',
      component: LeaderBord
    }
  ]
})

export default router
