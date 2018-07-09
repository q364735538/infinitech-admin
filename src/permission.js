import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// // permission judge function
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

const whiteList = ['/login', '/authredirect']// no redirect whitelist
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.addRouters.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          const modules = [
            { ename: 'product', path: '/product', cname: '产品管理' },
            { ename: 'productManagement', path: 'product-management', cname: '产品列表' },
            { ename: 'programme', path: '/programme', cname: '方案管理' },
            { ename: 'programmeManagement', path: 'programmeManagement', cname: '方案列表' },
            { ename: 'endProductManagement', path: '/endProduct', cname: '成品管理' },
            { ename: 'endProductList', path: 'endProductList', cname: '成品列表' },
            { ename: 'endProductCustomized', path: 'endProductCustomized', cname: '成品制作' },
            { ename: 'user', path: '/user', cname: '用户管理' },
            { ename: 'userManagement', path: 'userManagement', cname: '用户列表' },
            { ename: 'order', path: '/order', cname: '订单管理' },
            { ename: 'orderManagement', path: 'orderManagement', cname: '用户列表' },
            { ename: 'platform', path: '/platform', cname: '平台配置' },
            { ename: 'partsClassify', path: 'partsClassify', cname: '器件分类' },
            { ename: 'programmeClassify', path: 'programmeClassify', cname: '方案分类' },
            { ename: 'finishedProduct', path: 'finishedProduct', cname: '成品分类' },
            { ename: 'contentList', path: 'contentList', cname: '内容管理' },
            { ename: 'freightConfig', path: 'freightConfig', cname: '运费配置' },
            { ename: 'webInfo', path: 'webInfo', cname: '网页信息' },
            { ename: 'powerManagement', path: '/powerManagement', cname: '权限管理' },
            { ename: 'Administrators', path: 'Administrators', cname: '管理员' },
            { ename: 'roles', path: 'roles', cname: '角色' }
            // { ename: 'example', path: '/example', cname: '表当' },
            // { ename: 'createArticle', path: 'createArticle', cname: '管员' },
            // { ename: 'articleList', path: 'list', cname: '角' }
          ]
          // var a = { ename: 'editArticle', path: 'edit/:id(\\d+)', cname: '角' }
          // for (let index = 0; index < modules.length; index++) {
          //   if (modules[index].ename === 'example') {
          //     modules.push(a)
          //   }
          // }
          // const modules = ['endProductCustomized', 'endProductList', 'endProductManagement', 'orderManagement', 'user', 'Order', 'userManagement', ]
          store.dispatch('GenerateRoutes', modules).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      }
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
