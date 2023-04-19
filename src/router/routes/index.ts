import MainLayout from '@/layouts/index.vue'
import type { RouteRecordRaw } from 'vue-router'

export const constRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: MainLayout,
    redirect: { name: 'Index' },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () =>
          import(
            /* webpackChunkName: "homepage" */ '@/pages/homepage/index.vue'
          ),
        meta: {
          title: '首页',
          icon: 'bx:home-alt',
          // roles: [RoleEnum.ADMIN],
        },
      },
      {
        path: '/institution',
        name: 'Institution',
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "institution" */ '@/pages/institution/index.vue'
          ),
        meta: {
          title: '院校库',
          icon: 'bx:book',
          // roles: [RoleEnum.ADMIN],
        },
      },
      {
        path: '/community',
        name: 'Community',
        component: () =>
          import(
            /* webpackChunkName: "community" */ '@/pages/community/index.vue'
          ),
        meta: {
          title: '讨论区',
          icon: 'bx:comment',
          // roles: [RoleEnum.ADMIN],
        },
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () =>
          import(
            /* webpackChunkName: "profile" */ '@/pages/user-profile/index.vue'
          ),
        meta: {
          title: '用户中心',
          icon: 'bx:user',
          // roles: [RoleEnum.ADMIN],
          hideInMenu: true,
        },
      },
    ],
  },
]
