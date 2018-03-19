import config from '@/utils/config'

let routes = [{
  path: config.web.module.index,
  component: resolve => require(['@/views/index.vue'], resolve),
  redirect: config.web.module.article.index,
  // hidden: true,
  children: [{
    path: config.web.module.article.index,
    component: resolve => require(['@/views/article/list.vue'], resolve)
  }, {
    path: config.web.module.article.list,
    component: resolve => require(['@/views/article/list.vue'], resolve)
  }, {
    path: config.web.module.article.detail,
    component: resolve => require(['@/views/article/detail.vue'], resolve)
  }]
}];

export default routes
