import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies'

import App from './App'
import MainPage from './pages/Main';
import LoginPage from './pages/Login';

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(VueMaterial);

Vue.use(VueRouter);
Vue.use(VueCookies);

const routes = [
  {
    path: '/',
    name: 'posts',
    component: MainPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
