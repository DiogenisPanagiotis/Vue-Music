import Vue from 'vue';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Root from './Root.vue';

Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'root',
    component: Root
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  template: '<router-view class="view"></router-view>'
}).$mount('#app');