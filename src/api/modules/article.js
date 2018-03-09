import config from "@/utils/config"
import {
  get,
  post
} from '@/utils/request'

export function search(page, size, keyword, catalogpath, ishighlight, startdate, enddate, orderby) {
  var param = {
    url: config.api.module.article.search,
    data: {
      page: page,
      size: size,
      keyword: keyword,
      catalogpath: catalogpath,
      startdate: startdate,
      enddate: enddate,
      orderby: orderby,
      ishighlight: ishighlight,
      status: 1
    },
    loading: false
  }
  return post(param)
}

export function getsingle(pid) {
  var param = {
    url: config.api.module.article.getsingle,
    data: {
      pid: pid
    },
    loading: false
  }
  return get(param)
}
