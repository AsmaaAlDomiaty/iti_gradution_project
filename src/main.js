import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Dashboard from "./views/UserDashboardView.vue";
import Room from "./views/AddEditRoomView.vue";
import Report from "./views/ReportIssueView.vue";

const router=createRouter({
  history:createWebHistory(),
  routes:[
    {path:"/",redirect:"/dashboard"},
    {path:"/dashboard",component:Dashboard},
    {path:"/add-room",component:Room},
    {path:"/edit-room/:id",component:Room},
    {path:"/report",component:Report}
  ]
});
createApp(App).use(createPinia()).use(router).mount("#app");
