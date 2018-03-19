import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import routes from '@/routes'
import axios from 'axios'
import {
  get,
  post
} from '@/utils/request'

import util from "@/utils/util"
import config from "@/utils/config"

import MainHeader from './components/header.vue';
import MainFooter from './components/footer.vue';

Vue.config.productionTip = false

//定义全局变量
Vue.prototype.$post = post
Vue.prototype.$get = get

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.component('main-header', MainHeader);
Vue.component('main-footer', MainFooter);

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

const app = new Vue({
  render: h => h(App),
  router
}).$mount('#app')
