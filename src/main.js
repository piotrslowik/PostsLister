import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies'
import Axios from 'axios';

import App from './App'
import MainPage from './pages/Main';
import LoginPage from './pages/Login';
import { eventBus } from './events';

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
});

Axios.interceptors.response.use(
  response => {
    const tokenString = response.headers.authorization;
    if (tokenString) {
      const token = tokenString.split(' ')[1];
      Vue.$cookies.set('token', token, 60);
      eventBus.$emit('tokenSet', token);
    }
    return response;
  },
  error => {
    const status = error.response.status;
    if (status === 401) {
      alert('You have to log in');
      router.push({name: 'login'});
      eventBus.$emit('tokenSet', null);
    }
    return error;
  }
)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
