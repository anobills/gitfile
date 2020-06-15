import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/index'
// import Record from '@/components/record'
// import About from '@/components/about/about'
// import MyApp from '@/components/myapp/myapp'
// import Detail from '@/components/detial'
// import Write from '@/components/write'
// import DrawLJ from '@/components/DrawLJ'
// import AppDetial from '@/components/appDetial'

Vue.use(Router)

export default new Router({
  // mode:' hash ' ,// é»˜è®¤
  mode: 'history',
  routes: [
    {path: '/about',
    component: resolve =>require(['@/components/about/about'],resolve)
  },
    {
      path: '/myApp',
      component: resolve =>require(['@/components/myapp/myapp'],resolve),
      children: [
        {
          path: 'drawLJ',
          component: resolve =>require(['@/components/DrawLJ'],resolve),
        },
        {
          path: 'nothing',
          component: resolve =>require(['@/components/appDetial'],resolve),
        },
        
      ]
    },
    {
      path: '/record',
      component: resolve =>require(['@/components/record'],resolve),
    },
    {
      path: '/myApiWrite',
      component: resolve =>require(['@/components/write'],resolve),

    },
    
    {
        path: '/index',
        component: resolve =>require(['@/components/index'],resolve),
        children: [
            {
              path: '/index/:id',
              component: resolve =>require(['@/components/detial'],resolve),
            }
        ]
        
    },
    {path: '/',redirect: '/index'},
    {path: '*',redirect: '/index'},
  ]
 
})
