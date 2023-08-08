import vue from '@vitejs/plugin-vue';
import { createRouter, createWebHistory } from "vue-router";
import SideMenu from "../layouts/SideMenu/SideMenu.vue";
import SimpleMenu from "../layouts/SimpleMenu/SimpleMenu.vue";
import TopMenu from "../layouts/TopMenu/TopMenu.vue";
import Dashboard from "../pages/dashboard/Main.vue";
import Users from "../pages/user/Main.vue";
import LogIn from "../pages/account/Login.vue";
import Register from "../pages/account/Register.vue";
import ErrorPage from "../pages/ErrorPage.vue";
import Clients from "../pages/client/Main.vue";
import ClientProfile from "../pages/client/Profile.vue";

const routes = [
  {
    path: "/home",
    component: SimpleMenu,
    children: [
      {
        path: "/dashboard",
        name: "side-menu-page-1",
        component: Dashboard,
      },
      {
        path: "/users",
        name: "side-menu-users",
        component: Users,
      },
      {
        path: "/clients",
        name: "side-menu-clients",
        component: Clients,
      },
      {
        path: "/client/:id",
        name: "",
        component: ClientProfile
      },
    ],
  },
  {
    path: "/",
    name: "logIn",
    component: LogIn,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/simple-menu",
    component: SimpleMenu,
    children: [
      {
        path: "page-1",
        name: "simple-menu-page-1",
        component: Dashboard,
      },
      {
        path: "page-2",
        name: "simple-menu-page-2",
        component: Users,
      },
    ],
  },
  {
    path: "/error-page",
    name: "error-page",
    component: ErrorPage,
  },
  {
    path: "/:pathMatch(.*)*",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

// const router = createRouter({
//   history: createWebHistory(),
//   routes: [{ path: '/:pathMatch(.*)', component: ErrorPage }],
// })

export default router;
