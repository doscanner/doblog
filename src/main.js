import Vue from 'vue'
import App from '@/App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import routes from '@/routes'
import axios from 'axios'
import {
  get,
  post
} from '@/utils/request'

import util from "@/utils/util"
import config from "@/utils/config"

Vue.config.productionTip = false

//定义全局变量
Vue.prototype.$post = post
Vue.prototype.$get = get

// , {
//   size: 'medium'
// }
Vue.use(ElementUI)
Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
