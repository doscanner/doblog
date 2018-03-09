import config from '@/utils/config'

let routes = [{
  path: config.web.module.index,
  component: resolve => require(['@/views/index.vue'], resolve),
  // hidden: true,
  children: [{
    path: config.web.module.article.list,
    component: resolve => require(['@/views/article/list.vue'], resolve),
  }]
}];

export default routes
