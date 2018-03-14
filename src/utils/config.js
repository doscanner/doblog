 const apiurl = 'http://api.doscanner.cn';
 //  const apiurl = 'http://localhost:21531';
 const weburl = 'http://www.doscanner.cn';
 //  const weburl = 'http://localhost:8080';
 const resurl = 'http://res.doscanner.cn';
 //const resurl = 'http://localhost:46940';
 const config = {
   api: {
     url: apiurl,
     timeout: 10000,
     module: {
       article: {
         getsingle: apiurl + '/api/article/getsingle',
         search: apiurl + '/api/article/search'
       },
       catalog: {
         getlist: apiurl + '/api/catalog/getlist'
       }
     }
   },
   web: {
     url: weburl,
     module: {
       index: '/',
       error: '/error/:code',
       article: {
         index: '/article/list',
         list: '/article/list/:path'
       },
     }
   },
   res: {
     url: resurl,
     module: {}
   },
   httpmethod: {
     post: 'post',
     get: 'get'
   },
   datatype: {
     json: 'json',
     xml: 'xml',
     html: 'html',
     jsonp: 'jsonp',
     text: 'text'
   },
   statuscode: {
     error: 501,
     unauthorized: 401,
     notfound: 404,
     notpermission: 502
   },
   enums: {
     orderby: {
       asc: {
         key: 'ASC',
         value: 0
       },
       desc: {
         key: 'DESC',
         value: 1
       }
     }
   },
   catalog: {
     path1: '00000000'
   }
 };

 export default config
