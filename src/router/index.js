import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/IndexView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    children: [
      {
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../views/OrdersView.vue')
      },
      {
        path: 'finished_orders',
        name: 'finished_orders',
        component: () => import('../views/FinishedOrdersView.vue')
      },
      {
        path: 'current_menu',
        name: 'current_menu',
        component: () => import('../views/CurrentMenuView.vue')
      },
      {
        path: 'menus',
        name: 'menus',
        component: () => import('../views/MenusView.vue'),
        children: [
          
          {
            path: 'create_item',
            name: 'create_item',
            component: () => import('../views/CreateMenuView.vue'),
          },
        ]
      },
      {
        path: 'menus/create_menu',
        name: 'create_menu',
        component: () => import('../views/CreateMenuView.vue'),
      },
      {
        path: 'bills',
        name: 'bills',
        component: () => import('../views/BillsView.vue')
      },
      {
        path: 'payments',
        name: 'payments',
        component: () => import('../views/PaymentsView.vue')
      }
    ]
  },
  /*
  {
    path: '/admin/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue')
  },
  
  {
    path: '/admin/orders',
    name: 'orders',
    component: () => import('../views/OrdersView.vue')
  },
  */
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
