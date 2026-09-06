import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/search', name: 'search', component: () => import('../views/SearchView.vue') },
    { path: '/roommates', name: 'roommates', component: () => import('../views/RoommatesView.vue') },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/register', name: 'register', component: () => import('../views/RegisterView.vue') },
    { path: '/dashboard', name: 'dashboard', component: () => import('../views/UserDashboardView.vue') },
    { path: '/add-room', name: 'add-room', component: () => import('../views/AddEditRoomView.vue') },
    { path: '/edit-room/:id', name: 'edit-room', component: () => import('../views/AddEditRoomView.vue') },
    { path: '/room/:id', name: 'room-details', component: () => import('../views/RoomDetailsView.vue') },
    { path: '/report', name: 'report', component: () => import('../views/ReportIssueView.vue') },
    { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue') },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/admin', name: 'admin', component: () => import('../views/AdminDashboardView.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') }
  ]
})

export default router